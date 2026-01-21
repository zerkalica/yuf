namespace $.$$ {
	export class $yuf_localizer_key_form extends $.$yuf_localizer_key_form {

		@ $mol_mem
		override text_name() {
			return [
				this.lang_code(),
				this.is_new() ? this.is_new_text() : '',
				this.is_not_used() ? this.is_not_used_text() : '',
			].filter(Boolean).join(', ')
		}

		override text_edit_enabled() {
			return ! this.is_not_used()
		}

		override reset() {
			this.model().text(null)
		}

		override reset_hint() {
			return super.reset_hint().replace('{prev}', this.model().text_actual() || '\'\'')
		}

		override reset_content() {
			return this.model().is_changed() ? super.reset_content() : []
		}

		@ $mol_mem
		focus_first() {
			if (! this.autofocus()) return null
			return new $mol_after_frame(() => this.text_bring())
		}

		protected text_bring = $mol_wire_async(() => this.Text().bring())

		override auto() {
			this.focus_first()
		}

		
	}
}
