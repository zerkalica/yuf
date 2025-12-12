namespace $.$$ {
	export class $yuf_localizer_catalog extends $.$yuf_localizer_catalog {
		protected val(key: string, next?: string | null) {
			return this.$.$mol_state_arg.value(
				`${this.param_base()}_${key}`,
				next === undefined || next ? next : null
			)
		}

		override param() {
			return `${this.param_base()}_langkey`
		}

		override lang_code_selected(next?: string) {
			return this.val('lang', next) || this.project().lang_main()
		}

		override app_url(next?: string) {
			return this.val('url', next) ?? ''
		}

		override langs_str(next?: string) {
			return this.val(`langs`, next) ?? ''
		}

		override keys_filter_value(next?: string) {
			return this.val('keys', next) ?? ''
		}

		override empty_content() {
			return this.app_url() ? [ this.not_found_keys() ] : [ this.setup_needed() ]
		}

		all_data(next?: Parameters<typeof $yuf_localizer_project_model.data>[0]) {
			return this.$.$mol_static.$yuf_localizer_project_model.data(next)
		}

		@ $mol_mem
		override locales_data_str(next?: string) {
			const data = this.all_data(next === undefined ? next : JSON.parse(next || '{}'))
			return JSON.stringify(data, null, '\t')
		}

		@ $mol_mem
		override langs_available() {
			const main = this.project().lang_main()
			return [
				main,
				...this.langs_str().split(',').map(str => str.trim()).filter(str => str && str !== main)
			]
		}

		@ $mol_action
		settings_checked_default() {
			return ! this.app_url() || ! this.langs_available().length
		}

		@ $mol_mem
		override settings_checked(next?: boolean) {
			return next ?? this.settings_checked_default()
		}

		override pages() {
			return this.settings_checked() ? [...super.pages(), this.Settings()] : super.pages()
		}

		override lang_selected() {
			return this.project().file(this.lang_code_selected())
		}

		override locale_key(key: string) { return key }

		override item_theme(key: string) {
			const model = this.lang_selected()
			const item = model.item(key)
			if (item.is_changed()) return this.item_theme_changed()
			if (item.is_new()) return this.item_theme_new()
			if (item.is_not_used()) return this.item_theme_not_used()
			return null!
		}

		override spread_ids() {
			if (! this.lang_code_selected()) return []
			return this.spread_ids_params({ keys_filter: this.keys_filter_value() })
		}

		@ $mol_action
		override select_key(key?: 'prev' | 'next') {
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
			const data = this.lang_selected().data_own()
			const str = JSON.stringify(data, null, '\t')
			this.$.$mol_dom.navigator.clipboard.writeText(str)
		}

		override diff_to_clipboard_enabled() {
			if (! this.lang_code_selected()) return false
			return $mol_error_fence(() => this.keys_changed().length > 0, () => false)
		}

	}
}
