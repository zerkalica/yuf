namespace $ {
	const dict = $mol_data_dict
	const str = $mol_data_string
	const langs_dto = dict(str)

	export class $yuf_localizer_model extends $mol_object {
		url() {
			return ''
		}

		id() { return '' }

		main() { return null as null | $yuf_localizer_model }

		@ $mol_mem_key
		protected static store(lang_code: string, next?: Record<string, string> | null) {
			return this.$.$mol_state_local.value(
				`${this}.store('${lang_code}')`,
				next === undefined || next ? next : null
			)
		}

		@ $mol_mem
		protected data_local(next?: null | Record<string, string | null>) {
			const factory = this.$.$yuf_localizer_model

			if (next) {
				next = { ... next }
				let count = 0
				for (let key in next) {
					if (next[key] == null) delete next[key]
					else count++
				}

				if (! count) next = null
			}

			const lang_code = this.id()

			return factory.store(lang_code, next as Record<string, string>) ?? {}
		}

		protected fetcher() { return this.$.$mol_static.$mol_fetch }

		@ $mol_mem
		data_actual() {
			const response = this.fetcher().success(this.url())

			return $mol_error_fence(
				() => langs_dto(response.json() as any),
				e => new $mol_error_mix(e instanceof TypeError ? 'Invalid json' : e.message, response, e)
			)
		}

		@ $mol_mem
		keys() {
			return Object.keys({ ...this.main()?.data_actual(), ...this.data_actual(), ...this.data_local() })
		}

		@ $mol_mem_key
		keys_filtered(params: { keys_filter?: '' | 'is_new' | 'is_not_used' | 'empty' }) {
			const kf = params.keys_filter
			return this.keys().filter(
				key => kf === 'is_new'
					? this.item(key).is_new()
					: kf === 'is_not_used'
						? this.item(key).is_not_used()
						: kf === 'empty'
							? ! this.item(key).text()
							: true
			)
		}

		@ $mol_mem
		keys_changed() {
			const local = this.data_local()
			const actual = this.data_actual()

			return Object.keys(local).filter(key => local[key] !== actual[key])
		}

		@ $mol_mem
		changed_diff() {
			const result = {} as Record<string, string>
			for (const key of this.keys_changed()) {
				result[key] = this.item_text(key)
			}

			return result
		}

		@ $mol_mem_key
		item_text(key: string, next?: string | null): string {
			if (next) next = next.trim()

			const local = this.data_local()
			const actual = this.data_actual()
			const text_actual = actual[key]
			if (next === text_actual) next == null
			const text_local = this.data_local(next === undefined ? next : { ... local, [key]: next })[key]

			return text_local ?? text_actual ?? ''
		}

		@ $mol_mem_key
		item(id: string) {
			return this.$.$yuf_localizer_item_model.make({
				id: $mol_const(id),
				text_main: () => (this.main() ?? this).item_text(id),
				text_actual: () => this.data_actual()[id] ?? null,
				text: next => this.item_text(id, next)
			})
		}

	}
}
