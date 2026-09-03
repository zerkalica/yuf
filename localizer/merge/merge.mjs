// @ts-check

import { basename, dirname, join } from 'node:path'
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
		try {
			const data = JSON.parse(raw.toString())
			this._cached[file] = data
			return data
		} catch (e) {
			if (e instanceof Error) e.message += ', ' + file
			throw e
		}
	}

	main_locale_code() { return 'en' }

	/**
	 * @param {string} module_path
	 */
	main_locale_path(module_path) {
		const name = `${basename(module_path)}.view.tree.locale=${this.main_locale_code()}.json`
		return join(this.root(), module_path, '-view.tree', name)
	}

	/**
	 * @param {string} module_path
	 */
	main_locale(module_path) {
		return this.locale(this.main_locale_path(module_path))
	}

	/**
	 * @param {string} key
	 */
	async key_directory_int(key, prefix = false) {
		const parts = key.slice(1).split('_')

		for (let i = parts.length - 1; i >= 0; i--) {
			let path = join(...parts.slice(0, i))
			if (prefix) path = join(path, basename(path))

			const locale = await this.main_locale(path)

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
     * @param {string} app_module_dir
     */
	async imported_files(app_module_dir) {
		/**
		 * @type (readonly [string, string])[]
		 */
		const result = []

		do {
			const names = await readdir(app_module_dir)
			for (const name of names) {
				const [ _, lang_code ] = name.match(/\.view\.tree\.locale=(\w+)\.json$/) ?? []
				if (! lang_code) continue
				const imported_file = join(app_module_dir, name)
				result.push([imported_file, lang_code])
			}

			app_module_dir = dirname(app_module_dir)
		} while (app_module_dir)

		return result
	}

	/**
     * @param {string} app_module_dir
     */
	async imported_data(app_module_dir) {
       /** @type Record<string, Record<string, Record<string, string>>> */
		const patch = {}

		const imported_files = await this.imported_files(app_module_dir)

		for (const [imported_file, lang] of imported_files) {
			const imported_locale = await this.locale(imported_file)
			if (! imported_locale) continue

			for (const key of Object.keys(imported_locale)) {
				const module_path = await this.key_directory(key)
				if (! module_path ) continue
				const module_file = join(module_path, `${basename(module_path)}.view.tree.locale=${lang}.json`)

				const module_locale = await this.locale(module_file)

				if (module_locale?.[key] === imported_locale[key]) continue
				if (module_locale?.[key]) continue

				if (! patch[imported_file]) patch[imported_file] = {}
				if (! patch[imported_file][module_file]) patch[imported_file][module_file] = {}

				patch[imported_file][module_file][key] = imported_locale[key]
			}
		}

		return patch
	}

	all_locales_module() {
		return 'app'
	}

	/**
     * @param {string} app_module_dir
	 * @param {{exclude?: RegExp | null, include?: RegExp | null, update?: boolean, overwrite?: boolean }} options
     */
	async update(app_module_dir, { exclude, include, update, overwrite }) {
		const patches = await this.imported_data(app_module_dir)

		/** @type Record<string, Record<string, number>> | undefined */
		let success = undefined
		/** @type Record<string, Record<string, Record<string, string>>> | undefined */
		let errors = undefined

		/** @type Record<string, string[]> | undefined */
		let excluded = undefined

		const main_locale = await this.locale(join(this.root(), app_module_dir, this.all_locales_module(), '-', `web.locale=${this.main_locale_code()}.json`))

		for (const patch_file of Object.keys(patches)) {
			const patch_group = patches[patch_file]

			/**
			 * @type {typeof main_locale | undefined}
			 */
			let main_locale_dict = undefined

			const patch_data = { ... (await this.locale(patch_file)) }

			for (const module_file of Object.keys(patch_group)) {

				const patch = patch_group[module_file]
				const patch_keys = Object.keys(patch)

				if (
					(exclude && module_file.match(exclude))
					|| (include && ! module_file.match(include))
				) {
					if (! excluded) excluded = {}
					if (! excluded[patch_file]) excluded[patch_file] = []
					excluded[patch_file].push(module_file)
					continue
				}

				for (const key of patch_keys) delete patch_data[key]

				if (! success ) success = {}
				if (! success[patch_file] ) success[patch_file] = {}
				success[patch_file][module_file] = patch_keys.length

				const module_locale = await this.locale(module_file)
				const next = {  ... module_locale, ... patch }

				for (const key of Object.keys(next)) {
					if (! main_locale_dict) main_locale_dict = { ... main_locale }
					delete main_locale_dict[key]
				}

				if (update) await this.locale(module_file, next)
			}

			const src_data_keys = Object.keys(patch_data)
				.filter(key => ! excluded?.[patch_file].includes(key))

			if (src_data_keys.length) {
				if (! errors ) errors = {}
				if (! errors.need_to_remove) errors.need_to_remove = {}
				errors.need_to_remove[patch_file] = patch_data
			}

			if (Object.keys(main_locale_dict ?? {}).length) {
				if (! errors ) errors = {}
				if (! errors.need_to_add) errors.need_to_add = {}
				errors.need_to_add[patch_file] = main_locale_dict ?? {}
			}

			if (update) this.locale(patch_file, src_data_keys.length === 0 ? null : patch_data)
		}

		const has_success = success && Object.keys(success).length > 0

		const suggest = []

		if (! update && has_success) suggest.push(
			'Add --update to write changes',
			'--overwrite to rewrite existing locale keys',
			'--include=dir1,dir2 or --exclude=dir1,dir2 to include or exclude some paths from update'
		)

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
			overwrite: this.param_raw('overwrite') !== null,
			include: this.param_regexp('include'),
			exclude: this.param_regexp('exclude'),
		}
    }

	async process() {
		const options = this.commands()
		/** @type Record<string, Partial<Awaited<ReturnType<typeof this.update>>>> */
		let rec = options.directories.length ? {} : { '': {
			suggest: ['No directories provided'],
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
