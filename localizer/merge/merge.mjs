// @ts-check

import { basename, dirname, join } from 'node:path'
import { stat, writeFile, unlink, readFile, readdir } from 'node:fs/promises'

const module_locale_regexp = /\.view\.tree\.locale=(\w+)\.json$/
const builded_locale_regexp = /^web\.locale=(\w+)\.json$/
const patch_locale_regexp = /^[\w\d]+\.locale=(\w+)\.json$/

/**
 * @param {readonly string[]} paths
 */
function paths_to_regexp(paths) {
	const escapedPaths = paths.map(path => path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

	const pattern = `^(${escapedPaths.join('|')})`

	return new RegExp(pattern)
}

/**
 * @param {string} file
 */
async function exists(file) {
	let info

	try {
		info = await stat(file)
	} catch {}

	return Boolean(info?.isFile())
}

/**
 * @param {string} file
 * @returns {Promise<Record<string, string> | null>}
 */
async function read_json(file) {
	const raw = ! (await exists(file)) ? null : (await readFile(file))
	try {
		return ! raw ? null : JSON.parse(raw.toString())
	} catch (e) {
		if (e instanceof Error) e.message += ', ' + file
		throw e
	}
}

export class YufLocalizerMerge {

	/** @type Record<string, Record<string, string> | null | Promise<Record<string, string> | null>> */
	_cached = {}

	/**
	 * @param {string} file
	 * @param {null | Record<string, string | null>} [patch]
	 * @returns {Promise<Record<string, string> | null>}
	 */
	async locale_data(file, patch, overwrite = false) {
		file = join(this.root(), file)

		if (patch !== undefined) {
			if (patch === null) {
				await unlink(file)
				this._cached[file] = null
				return patch
			}

			let prev = this._cached[file]
			if (prev instanceof Promise || prev === undefined) prev = await this.locale_data(file)

			const next = { ...prev }

			for (const [key, value] of Object.entries(patch)) {
				if (value === null) delete next[key]
				if (value) next[key] = overwrite ? value : (prev?.[key] ?? value)
			}

			await writeFile(file, JSON.stringify(next, null, '  '))
			this._cached[file] = next

			return next
		}

		if (file in this._cached) return this._cached[file]

		const promise = read_json(file)
		this._cached[file] = promise

		const val = await promise
		this._cached[file] = val

		return val
	}

	/**
	 * @param {string} module_dir
	 */
	module_locale_name(module_dir, locale = 'en') {
		return `${basename(module_dir)}.view.tree.locale=${locale}.json`
	}

	/**
	 * @param {string} module_dir
	 */
	builded_module_locale_path(module_dir, locale = 'en') {
		return join(module_dir, '-view.tree', this.module_locale_name(module_dir, locale))
	}

	/**
	 * @param {string} module_dir
	 */
	module_locale_path(module_dir, locale = 'en') {
		return join(module_dir, this.module_locale_name(module_dir, locale))
	}


	/** @type {Record<string, string | null | Promise<string |null>>} */
	_directory_by_locale = {}

	/**
	 * @param {string} key
	 */
	async directory_by_locale_key(key) {
		if (this._directory_by_locale[key] !== undefined) return this._directory_by_locale[key]

		/**
		 * @param {string} key
		 */
		const lookup = async (key, prefix = false) => {
			const parts = key.slice(1).split('_')

			for (let i = parts.length - 1; i >= 0; i--) {
				let maybe_module_dir = join(...parts.slice(0, i))
				if (prefix) maybe_module_dir = join(maybe_module_dir, basename(maybe_module_dir))

				const path = this.builded_module_locale_path(maybe_module_dir, 'en')
				const locale = await this.locale_data(path)

				if (locale?.[key]) {
					Object.keys(locale ?? {}).forEach(key => {
						this._directory_by_locale[key] = maybe_module_dir
					})

					return maybe_module_dir
				}
			}

			return null
		}

		const dir_cb = async () => (await lookup(key)) ?? (await lookup(key, true))

		const dir_promise = dir_cb()
		this._directory_by_locale[key] = dir_promise

		return this._directory_by_locale[key] = (await dir_promise)
	}

	/**
	 * @param {string} app_module_dir
	 * @param {RegExp} regexp
	 */
	async locale_files(app_module_dir, regexp) {
		/**
		 * @type Record<string, string[]>
		 */
		const result = {}
		const dir = join(this.root(), app_module_dir)
		const names = await readdir(dir)

		for (const name of names) {
			const [ _, lang_code ] = name.match(regexp) ?? []
			if (! lang_code) continue
			if (! result[lang_code]) result[lang_code] = []
			result[lang_code].push(join(app_module_dir, name))
		}

		return result
	}

	/**
     * @param {string} app_module_dir
	 * @param {RegExp} regexp
     */
	async locale_data_by_code(app_module_dir, regexp, look_up_level = 0) {
       /** @type Record<string, Record<string, Record<string, string>>> */
		const patches = {}

		do {
			const lang_paths = await this.locale_files(app_module_dir, regexp)

			for (const [lang_code, paths] of Object.entries(lang_paths)) {
				for (const path of paths) {
					const data = await this.locale_data(path)
					if (! data) continue
					if ( ! patches[lang_code] ) patches[lang_code] = {}
					patches[lang_code][path] = data
				}
			}
			app_module_dir = dirname(app_module_dir)
			look_up_level--
		} while (app_module_dir && look_up_level >= 0)

		return patches
	}

	all_locales_module() {
		return 'app'
	}

	/**
	 * 
	 * @param {string} app_module_dir
	 * @param {RegExp | null} exclude
	 */
	async app_locale_info(app_module_dir, exclude = null) {
		const build_dir = join(app_module_dir, '-')
		const builded_locales = await this.locale_data_by_code(build_dir, builded_locale_regexp)
		const en_files = Object.keys(builded_locales.en ?? {})
		if (! en_files.length) throw new Error('Required builded module with en locale', { cause: { build_dir }})
		const en_locale = builded_locales.en[en_files[0]]
		const en_keys_all = Object.keys(en_locale)

			/** @type Record<string, Record<string, string | null> | null> | null */
		let diff = null

		/**
		 * @param {string} path
		 * @param {string} key
		 * @param {string | null} next
		 */
		const diff_update = (path, key, next) => {
			if (! diff) diff = {}
			if ( ! diff[path]) diff[path] = {}
			diff[path][key] = next
		}

		/** @type Set<string> */
		const module_dirs = new Set()

		/** @type {string[] | undefined} */
		let keys_not_found

		for (const key of en_keys_all) {
			const dir = await this.directory_by_locale_key(key)
			if (dir) {
				module_dirs.add(dir)
				continue
			}
			if (! keys_not_found) keys_not_found = []
			keys_not_found.push(key)
		}

		const patches = await this.locale_data_by_code(app_module_dir, patch_locale_regexp, 20)

		const lang_codes = Object.keys(builded_locales).filter(code => code !== 'en')
		for (const lang_code of Object.keys(patches)) {
			if (lang_codes.includes(lang_code)) continue
			lang_codes.push(lang_code)
		}

		if (! lang_codes.length) throw new Error('Required some non-en locales', { cause: { build_dir } })

		for (const module_dir of module_dirs) {
			if (exclude && module_dir.match(exclude)) continue
			const module_en_path = this.builded_module_locale_path(module_dir, 'en')
			const module_en_data = (await this.locale_data(module_en_path)) ?? {}
			const module_en_keys = Object.keys(module_en_data)

			for (const lang_code of lang_codes) {
				const locale_path = this.module_locale_path(module_dir, lang_code)
				const locale_data = await this.locale_data(locale_path) ?? {}

				module_en_keys.forEach(key => locale_data[key] ? null : diff_update(locale_path, key, ''))

				for (const [patch_path, patch_data] of Object.entries(patches[lang_code] ?? {})) {
					for (const [key, patch_value] of Object.entries(patch_data)) {
						if (locale_data[key] !== patch_value) diff_update(locale_path, key, patch_value)
						diff_update(patch_path, key, null)
					}
				}

				Object.keys(locale_data).forEach(key => module_en_data[key] ? null : diff_update(locale_path, key, null))

			}
		}

		for (const [lang_code, locale_data_by_file] of Object.entries(patches)) {
			for (const [patch_path, patch_data] of Object.entries(locale_data_by_file)) {

				const is_all_keys_deleted = Object.keys(patch_data).every(key => {
					if (! en_locale[key]) diff_update(patch_path, key, null)
					return diff?.[patch_path]?.[key] === null
				})

				if (! is_all_keys_deleted) continue
				if (! diff) diff = {}
				diff[patch_path] = null
			}
		}

		return { keys_not_found, diff }
	}

	/**
	 * 
	 * @param {Record<string, Record<string, string | null> | null> | null} diff
	 */
	diff_format(diff) {
		/** @type Record<string, '-' | Record<string, '-' | '+' | '!'>> | undefined */
		let changed

		for (const [path, data] of Object.entries(diff ?? {})) {
			if (data === null) {
				if (! changed) changed = {}
				changed[path] = '-'
				continue
			}

			for (const [key, value] of Object.entries(data)) {
				if (! changed) changed = {}
				if (typeof changed[path] === 'string') continue
				if (! changed[path]) changed[path] = {}
				changed[path][key] = value === null ? '-' : value === '' ? '!' : '+'
			}
		}

		return changed
	}

	/**
     * @param {string} app_module_dir
	 * @param {{exclude?: RegExp | null, update?: boolean, overwrite?: boolean }} options
     */
	async update(app_module_dir, { exclude, update, overwrite }) {
		let { keys_not_found, diff } = await this.app_locale_info(app_module_dir, exclude)

		if (update && diff) {
			for (let [ path, patch ] of Object.entries(diff) ) {
				await this.locale_data(path, patch, overwrite)
			}
		}

		const suggest = []

		if (! update) suggest.push(
			'Add --update to write changes',
			'--overwrite to rewrite existing locale keys',
			'--exclude=dir1,dir2 to exclude some paths from update'
		)

		return { keys_not_found, changes: this.diff_format(diff), suggest }
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

		const has_error = Object.values(rec).some(item => item.keys_not_found)
		if (has_error) process.exit(1)

	}

}
