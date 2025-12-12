namespace $.$$ {
	export class $yuf_localizer_page extends $.$yuf_localizer_page {
		langs() {
			const lang = this.lang_code()
			const available = this.langs_available()
			return [ lang, ...available.filter(src => src !== lang) ]
		}

		@ $mol_mem
		override forms() {
			if (! this.project() ) return []
			return this.langs().map(lang_code => this.Form(lang_code))
		}

		override locale_by_lang_code(lang_code: string) {
			return this.project()!.file(lang_code).item(this.locale_key())
		}

		override lang_code_id(lang_code: string) {
			return lang_code
		}

		override autofocus(lang_code: string) {
			return lang_code === this.lang_code()
		}
	}
}
