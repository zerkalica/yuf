namespace $ {
	export class $yuf_localizer_store extends $mol_object {
		base_url(next?: string) {
			return ''
		}

		lang_template() {
			return 'web.locale={lang}.json'
		}

		@ $mol_mem
		lang_main(next?: string) {
			return next ?? 'en'
		}

		protected lang_url(lang: string) {
			return this.base_url() + '/' + this.lang_template().replace('{lang}', lang)
		}

		@ $mol_mem
		model_main() {
			return this.model(this.lang_main())
		}

		@ $mol_mem_key
		model(lang: string): $yuf_localizer_model {
			return this.$.$yuf_localizer_model.make({
				id: $mol_const(lang),
				url: () => this.lang_url(lang),
				main: () => lang === this.lang_main() ? null : this.model_main(),
			})
		}

	}
}
