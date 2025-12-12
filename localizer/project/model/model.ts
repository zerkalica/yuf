namespace $ {
	export class $yuf_localizer_project_model extends $mol_object {
		url() {
			return ''
		}

		lang_template() {
			return 'web.locale={lang}.json'
		}

		lang_main() {
			return 'en'
		}

		protected lang_url(lang: string) {
			const url = this.url().replace(/\/+$/, '')
			if (! url) return ''
			return url + '/' + this.lang_template().replace('{lang}', lang)
		}

		@ $mol_mem
		protected model_main() {
			return this.file(this.lang_main())
		}

		@ $mol_mem
		data(next?: Record<string, Record<string, string> | null> | null) {
			return next ?? {}
		}

		@ $mol_mem_key
		protected lang_data(lang: string, next?: Record<string, string | null> | null) {
			const prev = this.data()
			if (next === undefined) return prev[lang] ?? {}

			return this.data({
				[lang]: next ? $yuf_dict_degrease({ ... prev[lang], ... next }) : null
			})[lang] ?? {}
		}

		@ $mol_mem_key
		file(lang: string): $yuf_localizer_file_model {
			return this.$.$yuf_localizer_file_model.make({
				id: $mol_const(lang),
				url: () => this.lang_url(lang),
				data: next => this.lang_data(lang, next),
				main: () => lang === this.lang_main() ? null : this.model_main(),
			})
		}

	}
}
