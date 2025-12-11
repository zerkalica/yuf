namespace $.$$ {
	export class $yuf_localizer_catalog extends $.$yuf_localizer_catalog {
		protected val(key: string, next?: string | null) {
			return this.$.$mol_state_arg.value(
				`${this.param_prefix()}_${key}`,
				next === undefined || next ? next : null
			)
		}

		override param() {
			return `${this.param_prefix()}_${super.param()}`
		}

		override lang_code_selected(next?: string) {
			return this.val('lang_code_selected', next) || ''
		}

		override app_url(next?: string) {
			return this.val('url', next) ?? ''
		}

		override langs_str(next?: string) {
			return this.val(`langs`, next) ?? ''
		}

		override lang_main(next?: string) {
			return this.val(`lang_main`, next) || this.langs_available()?.[0] || ''
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

		protected locales_data_push_serial = (
			(next: Parameters<typeof this.locales_data_push>[0]) => this.locales_data_push(next)
		)

		override langs_available() {
			return this.langs_str().split(',').map(str => str.trim()).filter(Boolean)
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

			return item.is_new()
				? this.item_theme_new()
				: item.is_not_used() ? this.item_theme_not_used() : null!
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
