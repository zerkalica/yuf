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
	 */
	locale_data_cache(file) {
		const prev = this._cached[file]
		if (prev instanceof Promise) return undefined
		return prev
	}

	/**
	 * @param {string} file
	 * @param {null | Record<string, string | null | undefined>} [patch]
	 * @returns {Promise<Record<string, string> | null>}
	 */
	async locale_data(file, patch) {
		file = join(this.root(), file)

		if (patch !== undefined) {
			if (patch === null) {
				await unlink(file)
				this._cached[file] = null
				return patch
			}

			let prev = this.locale_data_cache(file)
			if (prev === undefined) prev = await this.locale_data(file)

			const next = { ...prev }

			for (const [key, value] of Object.entries(patch)) {
				if (value === null) delete next[key]
				else if (value === undefined) continue
				else next[key] = value
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
				let locale = this.locale_data_cache(path)
				if (locale === undefined) locale = await this.locale_data(path)

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
					let data = this.locale_data_cache(path)
					if (data === undefined) data = await this.locale_data(path)
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
	 * @param {{langs?: readonly string[], exclude?: RegExp | null}} options
	 */
	async app_locale_info(app_module_dir, { exclude, langs }) {
		const build_dir = join(app_module_dir, '-')
		const builded_locales = await this.locale_data_by_code(build_dir, builded_locale_regexp)
		const en_files = Object.keys(builded_locales.en ?? {})
		if (! en_files.length) throw new Error('Required builded module with en locale', { cause: { build_dir }})
		const en_locale = builded_locales.en[en_files[0]]
		const en_keys_all = Object.keys(en_locale)

		/** @type {Record<string, Record<string, string | null | undefined> | null> | null} */
		let diff = null

		/**
		 * @param {string} path
		 * @param {string} key
		 * @param {string | null | undefined} next
		 */
		const diff_update = (path, key, next) => {
			if (! diff) diff = {}
			if ( ! diff[path]) diff[path] = {}
			diff[path][key] = next
		}

		/** @type {Set<string>} */
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

		const lang_codes = langs?.length ? [ ... langs ] : Object.keys(builded_locales).filter(code => code !== 'en')
		/** @type {Record<string, readonly [string, Record<string, string>][]>} */
		const patch_datas = {}
		for (const [lang_code, data] of Object.entries(patches)) {
			patch_datas[lang_code] = Object.entries(data)
			if (lang_codes.includes(lang_code)) continue
			lang_codes.push(lang_code)
		}

		if (! lang_codes.length) throw new Error('Required some non-en locales', { cause: { build_dir } })

		/** @type {Record<string, Record<string, string>> | undefined} */
		let translate

		for (const module_dir of module_dirs) {
			if (exclude && module_dir.match(exclude)) {
				continue
			}
			const module_en_path = this.builded_module_locale_path(module_dir, 'en')
			let module_en_data = this.locale_data_cache(module_en_path)
			if (module_en_data === undefined) module_en_data = (await this.locale_data(module_en_path)) ?? {}
			if (! module_en_data) module_en_data = {}
			const module_en_keys = Object.keys(module_en_data)

			for (const lang_code of lang_codes) {
				const locale_path = this.module_locale_path(module_dir, lang_code)
				const locale_data = await this.locale_data(locale_path) ?? {}

				// Add non-existing keys from en locale
				for (const key of module_en_keys) {
					let patch_value = locale_data[key]

					for (const [patch_path, patch_data] of patch_datas[lang_code] ?? [] ) {
						if (! (key in patch_data) ) continue
						patch_value = patch_data[key]
						// remove moved key from locale patch
						diff_update(patch_path, key, null)
					}

					if (locale_data[key] !== patch_value) diff_update(locale_path, key, patch_value)

					if (patch_value !== undefined) continue

					if (! translate ) translate = {}
					if (! translate[lang_code] ) translate[lang_code] = {}
					if (! translate[lang_code][key]) translate[lang_code][key] = module_en_data[key]
				}

				for (const key of Object.keys(locale_data)) {
					if (key in module_en_data) continue
					// remove non-existing in main en locale keys from module locale
					diff_update(locale_path, key, null)
				}
			}
		}

		// Remove patch file if all keys removed
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

		return { keys_not_found, diff, translate }
	}

	/**
	 * 
	 * @param {Record<string, Record<string, string | null | undefined> | null> | null} diff
	 */
	diff_format(diff) {
		/** @type {Record<string, '-' | Record<string, '-' | '+' | 'N'>> | undefined} */
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
				changed[path][key] = value === null ? '-' : value === undefined ? 'N' : '+'
			}
		}

		return changed
	}

	/**
	 * @param {{directories: readonly string[], exclude?: RegExp | null, dry_run?: boolean, langs?: readonly string[], info?: boolean }} options
     */
	async update({ directories, exclude, dry_run, info, langs }) {
		/** @type {Record<string, Record<string, string | null | undefined> | null> | undefined} */
		let diff_all

		/** @type {Record<string, Record<string, string>> | undefined} */
		let translate_all

		/** @type {Set<string>} */
		const keys_not_found_all = new Set

		for (const app_module_dir of directories) {
			let { keys_not_found, diff, translate } = await this.app_locale_info(app_module_dir, { exclude, langs })
			keys_not_found?.forEach(key => keys_not_found_all.add(key))

			if (! translate_all) translate_all = {}
			for (const [path, data] of Object.entries(translate ?? {})) {
				if (! data) translate_all[path] = data
				else if (! translate_all[path] ) translate_all[path] = { ...data }
				else Object.assign(translate_all[path], data)
			}

			if (! diff_all ) diff_all = {}
			for (const [path, data] of Object.entries(diff ?? {})) {
				if (! data) diff_all[path] = data
				else if (! diff_all[path]) diff_all[path] = { ... data }
				else Object.assign(diff_all[path], data)
			}
		}

		if (diff_all && ! dry_run && ! info) {
			for (let [ path, patch ] of Object.entries(diff_all) ) {
				await this.locale_data(path, patch)
			}
		}

		/** @type {string[] | undefined} */
		let suggest

		if (! dry_run && ! info) {
			suggest = []
			suggest.push(
				'--dry-run to show file changes without writing',
				'--info to show translate mock',
				'--langs=es,fr,ru to add extra langs (detects from patches)',
				'--exclude=dir1,dir2 to exclude some paths from update'
			)
		} else if (! directories ) {
			suggest = ['No directories provided']
		}

		const changes = info || ! diff_all ? undefined : this.diff_format(diff_all)
		const translate_values_from_en_to = info ? translate_all : undefined

		const keys_not_found = ! keys_not_found_all.size ? undefined : [ ... keys_not_found_all ]

		return { changes, translate_values_from_en_to, keys_not_found, suggest }
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
			dry_run: this.param_raw('dry-run') !== null,
			info: this.param_raw('info') !== null,
			exclude: this.param_regexp('exclude'),
			langs: this.param_raw('langs')?.split(',').map(code => code.trim()).filter(Boolean)
		}
    }

	async run() {
		const rec = await this.update(this.commands())

		console.log(JSON.stringify(rec, null, ' '))

		if (rec.keys_not_found?.length) process.exit(1)

	}

}
