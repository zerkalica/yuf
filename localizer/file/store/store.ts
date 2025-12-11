namespace $ {
	export class $yuf_localizer_file_store extends $mol_object {
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

		@ $mol_mem
		data(next?: Record<string, Record<string, string>> | null) {
			return next ?? {}
		}

		@ $mol_mem_key
		locale_data(url: string, next?: Record<string, string | null> | null) {
			const locales_prev = this.data()
			if (next === undefined) return locales_prev[url] ?? {}

			const locales = { ... locales_prev }

			if (next) {
				next = { ... next }

				let count = 0

				for (let key in next) {
					if (next[key] == null) delete next[key]
					else count++
				}

				if (! count) delete locales[url]
				else locales[url] = next as Record<string, string>
			}

			if (next === null) delete locales[url]

			return this.data(locales)?.[url] ?? {}
		}

		@ $mol_mem_key
		model(lang: string): $yuf_localizer_file_model {
			return this.$.$yuf_localizer_file_model.make({
				id: $mol_const(lang),
				url: () => this.lang_url(lang),
				data: next => this.locale_data(this.lang_url(lang), next),
				main: () => lang === this.lang_main() ? null : this.model_main(),
			})
		}

	}
}
