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
			return this.val('lang', next) || this.store().lang_main()
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

		protected locales_data_raw(next?: string | null) {
			return this.$.$mol_state_local.value(this.state_key('locales_data_raw'), next)
		}

		@ $mol_mem
		override locales_data(next?: Record<string, Record<string, string>> | null) {
			if (next === undefined) return JSON.parse(this.locales_data_raw() ?? '{}') || {}

			this.locales_data_push_serial(next)

			return next
		}

		protected locales_data_push(next: Record<string, Record<string, string>> | null) {
			this.$.$mol_wait_timeout(200)
			const str = next === null ? null : JSON.stringify(next)
			this.locales_data_raw(str)
			return null
		}

		protected locales_data_push_serial = $mol_wire_async((
			(next: Parameters<typeof this.locales_data_push>[0]) => this.locales_data_push(next)
		))

		@ $mol_mem
		override langs_available() {
			const main = this.store().lang_main()
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

		override placeholders() {
			return this.settings_checked() ? super.placeholders() : []
		}

		override lang_selected() {
			return this.store().model(this.lang_code_selected())
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

		override settings_close() {
			return this.settings_checked(false)
		}

		override diff_to_clipboard_copy(e?: Event) {
			const diff = this.locales_data()

			this.$.$mol_dom.navigator.clipboard.writeText(JSON.stringify(diff, null, '\t'))
		}

		override diff_to_clipboard_enabled() {
			if (! this.lang_code_selected()) return false
			return $mol_error_fence(() => this.keys_changed().length > 0, () => false)
		}

	}
}
