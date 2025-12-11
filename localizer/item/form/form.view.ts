namespace $.$$ {
	export class $yuf_localizer_item_form extends $.$yuf_localizer_item_form {

		@ $mol_mem
		override text_name() {
			return [
				this.lang_code(),
				this.is_new() ? this.is_new_text() : '',
				this.is_not_used() ? this.is_not_used_text() : '',
				this.text_actual() !== (this.text() || null) ? this.is_changed_text() : '',
			].filter(Boolean).join(', ')
		}
		
	}
}
