namespace $.$$ {
	export class $yuf_localizer_catalog extends $.$yuf_localizer_catalog {
		protected val(key: string, next?: string | null) {
			return this.$.$mol_state_arg.value(
				`${this.param()}_${key}`,
				next === undefined || next ? next : null
			)
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

		override langs_available() {
			return this.langs_str().split(',').map(str => str.trim()).filter(Boolean)
		}

		override placeholders() {
			return ! this.app_url() || ! this.langs_available().length || this.settings_checked() ? super.placeholders() : []
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
			return this.spread_ids_params({ keys_filter: this.keys_filter_value() })
		}

		override settings_close() {
			return this.settings_checked(false)
		}

		override diff_to_clipboard_copy(e?: Event) {
			const diff = this.changed_diff()

			this.$.$mol_dom.navigator.clipboard.writeText(JSON.stringify(diff, null, '\t'))
		}

		override diff_to_clipboard_enabled() {
			return this.keys_changed().length > 0
		}

	}
}
