namespace $.$$ {
	export class $yuf_localizer_catalog extends $.$yuf_localizer_catalog {

		@ $mol_mem_key
		override val_str<Val extends string>(key: string, next?: Val | null) {
			return this.$.$mol_state_arg.value(
				`${this.param_base()}_${key}`,
				next === undefined || next ? next : null
			) as Val | '' ?? ''
		}

		override param() {
			return `${this.param_base()}_langkey`
		}

		override lang_code(next?: string) {
			return this.val_str('lang', next) || super.lang_code()
		}

		override project_url(next?: string | null) {
			const urls = this.projects_urls()
			const prev = this.val_str('project')
			if (! urls.includes(prev)) next = null

			return this.val_str('project', next) || urls?.[0] || ''
		}

		mode(next?: 'dupes' | null) {
			return this.val_str('mode', next) || null
		}

		override dupes_only(next?: boolean) {
			return this.mode(next ? 'dupes' : next === false ? null : undefined) === 'dupes'
		}

		override keys_filter(next?: $yuf_localizer_file_model_filter_type) {
			return this.val_str('keys', next) as $yuf_localizer_file_model_filter_type
		}

		@ $mol_mem
		override projects_urls() {
			const str = this.val_str('projects') ?? ''

			return str.split(/[\n\t]/).map(
				str => str.match(/^(?:https?)?:?(\/+[^#&?]+)/)?.[1]?.replace(/\/+(?:[\w\d]+\.[\w\d]+)?$/, '')?.trim() ?? ''
			).filter(Boolean)
		}

		lang_main() {
			return this.project()?.lang_main() ?? 'en'
		}

		@ $mol_mem
		override langs_available() {
			const lang_main = this.lang_main()
			const str = this.val_str('langs') ?? ''

			return [
				lang_main,
				... str.split(/[\s,~]/).map(str => str.trim()).filter(str => str && str !== lang_main)
			]
		}

		override project() {
			return this.project_url() ? this.projects().project(this.project_url()) : null
		}

		lang() {
			const code = this.lang_code()
			return ! code ? null : this.project()?.file(code)
		}

		override empty_content() {
			return this.project_url() ? [ this.not_found_keys() ] : [ this.setup_needed() ]
		}

		@ $mol_action
		settings_checked_default() {
			return ! this.project_url() || ! this.langs_available().length
		}

		@ $mol_mem
		override settings_checked(next?: boolean) {
			return next ?? this.settings_checked_default()
		}

		override pages() {
			return this.settings_checked() ? [...super.pages(), this.Settings()] : super.pages()
		}

		override locale_key(key: string) { return key }

		@ $mol_mem
		override spread_ids() {
			const keys_filter = this.keys_filter()
			const mode = this.mode()
			return this.lang()?.keys_filtered({ keys_filter, mode }) ?? []
		}

		@ $mol_action
		select_key(key?: 'prev' | 'next') {
			if (this.settings_checked()) return null
			const ids = this.spread_ids_filtered()
			const id = this.spread()
			const index = ids.indexOf(id)
			const direction = key === 'prev' ? -1 : 1

			const next = Math.min(ids.length - 1, Math.max(0, index + direction))

			const id_next = this.spread(ids[next])

			const item = this.Menu_item(id_next)
			this.Menu_links().ensure_visible(item, 'nearest')
		}

		override settings_close() {
			return this.settings_checked(false)
		}

		override diff_to_clipboard_enabled() {
			return $mol_error_fence(() => Boolean(this.lang()?.keys_changed().length) , () => false)
		}

		override placeholders() {
			return this.pages().length > 1 ? [] : super.placeholders()
		}

		override spread_title(key: string) {
			const str = this.Spread(key).title()
			const item = this.lang()?.item(key)
			if (! item) return str
			let prefix = ''
			if (item.is_not_used()) prefix += '⚠️'
			else if (item.is_changed()) prefix += '☑️'
			else if (item.is_new()) prefix += '❓'

			if (prefix) prefix += ' '

			return prefix + str
		}

		project_name_normalized(str: string) {
			const url = this.project_url()
				.replace(/[^\w\d\s]/g, '_')
				.replace(/_{2,}/g, '_')
				.replace(/^_+(.*)_+/g, '$1')
				.trim()

			const time = new $mol_time_moment().toString('YYYY-MM-DD_hh:mm:ss')
			return str.replace('{lang}', this.lang_code())
				.replace('{time}', time)
				.replace('{app}', url)
		}

		override locale_file_all_name() {
			return this.project_name_normalized(this.locale_file_all_name_tpl())
		}

		override locale_file_whole_name() {
			return this.project_name_normalized(this.locale_file_whole_name_tpl())
		}

		@ $mol_mem_key
		override locale_file_json(key: 'all' | 'changed' | 'whole') {
			const data = key === 'all' ? this.projects().locales() : this.lang()?.data_own(key) ?? ''
			return JSON.stringify(data, null, '\t') || '{}'
		}

		@ $mol_mem_key
		override locale_file_blob(key: Parameters<typeof this.locale_file_json>[0]) {
			const str = this.locale_file_json(key)
			return new Blob([str], { type: 'application/json' } )
		}

	}
}
