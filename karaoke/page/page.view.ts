namespace $.$$ {
	export class $yuf_karaoke_page extends $.$yuf_karaoke_page {
		
		override buttons_content() {
			return this.edit_enabled() ? super.buttons_content() : []
		}

		override edit_form_content() {
			return this.edit_enabled() ? super.edit_form_content() : []
		}
		
		override sing_content() {
			return this.edit_enabled() ? [] : super.sing_content()

		}

		
	}
}
