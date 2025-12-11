namespace $.$$ {
	export class $yuf_localizer_page extends $.$yuf_localizer_page {
		langs() {
			const selected = this.lang_code_selected()
			return [ selected, ...this.langs_available().filter(lang => lang !== selected) ]
		}

		@ $mol_mem
		override forms() {
			return this.langs().map(lang_code => this.Form(lang_code))
		}

		override locale_by_lang_code(lang_code: string) {
			return this.store().model(lang_code).item(this.locale_key())
		}

		locale_file_selected() {
			return this.store().model(this.lang_code_selected())
		}

		override lang_code(lang_code: string) {
			return lang_code
		}

		override autofocus(lang_code: string) {
			return lang_code === this.lang_code_selected()
		}
	}
}
