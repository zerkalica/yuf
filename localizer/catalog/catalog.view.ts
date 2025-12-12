namespace $.$$ {
	export class $yuf_localizer_catalog extends $.$yuf_localizer_catalog {

		@ $mol_mem_key
		override val_str<Val extends string>(key: string, next?: Val | null) {
			return this.$.$mol_state_arg.value(
				`${this.param_base()}_${key}`,
				next === undefined || next ? next : null
			) ?? ''
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

		override item_theme(key: string) {
			const model = this.lang()
			if (! model ) return null!

			const item = model.item(key)
			if (item.is_changed()) return this.item_theme_changed()
			if (item.is_new()) return this.item_theme_new()
			if (item.is_not_used()) return this.item_theme_not_used()

			return null!
		}

		@ $mol_mem
		override spread_ids() {
			const keys_filter = this.keys_filter()
			return this.lang()?.keys_filtered({ keys_filter }) ?? []
		}

		@ $mol_action
		override select_key(key?: 'prev' | 'next') {
			if (this.settings_checked()) return null
			const ids = this.spread_ids_filtered()
			const id = this.spread()
			const index = ids.indexOf(id)
			const direction = key === 'prev' ? -1 : 1

			const next = Math.min(ids.length - 1, Math.max(0, index + direction))

			const id_next = this.spread(ids[next])

			const item = this.Menu_item(id_next)
			this.Menu_links().ensure_visible(item)
		}

		override settings_close() {
			return this.settings_checked(false)
		}

		override diff_to_clipboard_copy(e?: Event) {
			const data = this.lang()?.data_own()
			if (! data) return null
			const str = JSON.stringify(data, null, '\t')
			this.$.$mol_dom.navigator.clipboard.writeText(str)
		}

		override diff_to_clipboard_enabled() {
			return $mol_error_fence(() => Boolean(this.lang()?.keys_changed().length) , () => false)
		}

	}
}
