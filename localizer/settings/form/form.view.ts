namespace $.$$ {
	export class $yuf_localizer_settings_form extends $.$yuf_localizer_settings_form {
		
		override available_langs() {
			return this.langs_str().split(',').map(str => str.trim()).filter(Boolean)
		}
		
	}
}
