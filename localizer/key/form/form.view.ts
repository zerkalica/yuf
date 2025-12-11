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

		override reset_content() {
			return this.model().is_changed() ? super.reset_content() : []
		}
		
	}
}
