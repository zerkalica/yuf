// @ts-check

import { basename, join } from 'node:path'
import { stat, writeFile, unlink, readFile, readdir } from 'node:fs/promises'

/**
 * @param {readonly string[]} paths
 */
function paths_to_regexp(paths) {
	const escapedPaths = paths.map(path => path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

	const pattern = `^(${escapedPaths.join('|')})`

	return new RegExp(pattern)
}

export class YufLocalizerMerge {

	/** @type Record<string, Record<string, string> | null> */
	_cached = {}

	/**
	 * @param {string} file
	 * @param {null | Record<string, string>} [next]
	 */
	async locale(file, next) {
		if (next !== undefined) {
			this._cached[file] = next

			if (next === null) {
				await unlink(file)
				return next
			}

			await writeFile(file, JSON.stringify(next, null, '  '))

			return next
		}

		if (file in this._cached) return this._cached[file]

		let info

		try {
			info = await stat(file)
		} catch {}

		if (! info?.isFile()) {
			this._cached[file] = null
			return null
		}
		const raw = await readFile(file)
		/** @type Record<string, string> */
		const data = JSON.parse(raw.toString())
		this._cached[file] = data
		return data
	}

	/**
	 * @param {string} key
	 */
	async key_directory_int(key, prefix = false) {
		const root = this.root()
		const parts = key.slice(1).split('_')

		for (let i = parts.length - 1; i >= 0; i--) {
			let path = join(...parts.slice(0, i))
			const name = basename(path)
			if (prefix) path = join(path, name)

			const full = join(root, path, '-view.tree', `${name}.view.tree.locale=en.json`)
			let locale = await this.locale(full)

			if (locale?.[key]) return path
		}

		return null
	}

	/**
	 * @param {string} key
	 */
	async key_directory(key) {
		const first = await this.key_directory_int(key)
		if (first) return first

		return await this.key_directory_int(key, true)
	}

	/**
     * @param {string} path
     */
	async locales_patch(path) {
       /** @type Record<string, Record<string, Record<string, string>>> */
		const patch = {}

		const list = await readdir(path)

		for (const name of list) {
			const [ _, lang ] = name.match(/\.locale=(\w+)\.json$/) ?? []
			if (! lang) continue

			const src_file = join(path, name)
			const locale = await this.locale(src_file)
			if (! locale) continue

			for (const key of Object.keys(locale)) {
				const module_dir = await this.key_directory(key)
				if (! module_dir ) continue
				const module_locale_name = `${basename(module_dir)}.locale=${lang}.json`
				const locale_file = join(module_dir, module_locale_name)

				if (! patch[src_file]) patch[src_file] = {}
				if (! patch[src_file][locale_file]) patch[src_file][locale_file] = {}
				const old_locale = await this.locale(locale_file)

				if (old_locale?.[key] === locale[key]) continue
				patch[src_file][locale_file][key] = locale[key]
			}
		}

		return patch
	}

	/**
     * @param {string} path
	 * @param {{exclude?: RegExp | null, include?: RegExp | null, update?: boolean}} options
     */
	async update(path, { exclude, include, update }) {
		const patches = await this.locales_patch(path)

		/** @type Record<string, Record<string, number>> | undefined */
		let success = undefined
		/** @type Record<string, string[]> | undefined */
		let errors = undefined

		/** @type Record<string, string[]> | undefined */
		let excluded = undefined

		for (const src_file of Object.keys(patches)) {
			const group = patches[src_file]

			const src_data = { ... (await this.locale(src_file)) }

			for (const locale_file of Object.keys(group)) {

				const patch = group[locale_file]
				const patch_keys = Object.keys(patch)


				if (
					(exclude && locale_file.match(exclude))
					|| (include && ! locale_file.match(include))
				) {
					if (! excluded) excluded = {}
					if (! excluded[src_file]) excluded[src_file] = []
					excluded[src_file].push(locale_file)
					continue
				}
				for (const key of patch_keys) delete src_data[key]

				if (! success ) success = {}
				if (! success[src_file] ) success[src_file] = {}
				success[src_file][locale_file] = patch_keys.length

				const old_locale = await this.locale(locale_file)
				const next = {  ... old_locale, ... patch }

				if (update) await this.locale(locale_file, next)
			}

			const src_data_keys = Object.keys(src_data)
				.filter(key => ! excluded?.[src_file].includes(key))

			if (src_data_keys.length) {
				if (! errors ) errors = {}
				errors[src_file] = src_data_keys
			}

			if (update) this.locale(src_file, src_data_keys.length === 0 ? null : src_data)
		}

		const has_success = success && Object.keys(success).length > 0

		const suggest = ! update && has_success
			? 'Add --update to write changes and --include=dir1,dir2 or --exclude=dir1,dir2 to include or exclude some paths from update'
			: has_success ? undefined : 'No locales found'

		return { success, errors, excluded, suggest }
	}

	/**
	 * @return {readonly string[]}
	 */
	args() {
		// @ts-ignore
		return typeof Deno !== 'undefined' ? Deno.args : process.argv.slice(2)
	}

	/**
	 * @return {string}
	 */
	root() {
	    // @ts-ignore
		return typeof Deno !== 'undefined' ? Deno.cwd() : process.cwd()
	}

	/** @param {string} key */
	param_raw(key) {
		key = `--${key}`
        const args = this.args()
        return args.find(arg => arg.trim().startsWith(key))?.slice(key.length + 1) ?? null
	}

	/** @param {string} key */
	param_regexp(key) {
		const raw = this.param_raw(key)?.split(',').map(src => src.trim()).filter(Boolean) ?? []
		return raw.length ? paths_to_regexp(raw) : null
	}

	commands() {
        const args = this.args()

		return {
			directories: args.filter(arg => ! arg.startsWith('--')),
			update: this.param_raw('update') !== null,
			include: this.param_regexp('include'),
			exclude: this.param_regexp('exclude'),
		}
    }

	async process() {
		const options = this.commands()
		/** @type Record<string, Partial<Awaited<ReturnType<typeof this.update>>>> */
		let rec = options.directories.length ? {} : { '': {
			suggest: 'No directories provided',
		} }

		for (const path of options.directories) {
			rec[path] = await this.update(path, options)
		}

		return rec
	}

	async run() {
		const rec = await this.process()

		console.log(JSON.stringify(rec, null, ' '))

		const has_error = Object.values(rec).some(item => item.errors)
		if (has_error) process.exit(1)

	}

}
