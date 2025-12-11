namespace $ {
	const dict = $mol_data_dict
	const str = $mol_data_string
	const langs_dto = dict(str)

	export class $yuf_localizer_file_model extends $mol_object {
		url() {
			return ''
		}

		id() { return '' }

		main() { return null as null | $yuf_localizer_file_model }

		@ $mol_mem
		data(next?: null | Record<string, string | null>) {
			return next ?? {}
		}

		protected fetcher() { return this.$.$mol_static.$mol_fetch }

		@ $mol_mem
		actual() {
			const lang_id = this.id()
			const url = this.url()
			const response = $mol_error_fence(
				() => this.fetcher().success(url),
				e => new $mol_error_mix(e.message + ' ' + lang_id, { lang_id, url }, e)
			)

			return $mol_error_fence(
				() => langs_dto(response.json() as any),
				e => new $mol_error_mix(e instanceof TypeError ? 'Invalid json' : e.message, { lang_id, url }, e)
			)
		}

		@ $mol_action
		data_cut_equal_actual() {
			const actual = this.actual()
			const local = this.data()
			const patch = {} as Record<string, string | null>

			let delete_count = 0

			for ( let key in local) {
				if (local[key] && local[key] === actual[key]) {
					delete_count++
					patch[key] = null
				}
			}

			if (delete_count) this.data(patch)

			return null
		}

		@ $mol_mem
		data_cut_equal_actual_once() {
			return this.data_cut_equal_actual()
		}

		@ $mol_mem
		keys() {
			this.data_cut_equal_actual_once()
			return Object.keys({ ...this.main()?.actual(), ...this.actual(), ...this.data() })
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
			const local = this.data()
			const actual = this.actual()

			return Object.keys(local).filter(key => local[key] !== actual[key])
		}

		@ $mol_mem_key
		protected key_text(key: string, next?: string | null): string {
			if (next) next = next.trim()

			const actual = this.actual()
			const text_actual = actual[key]
			if (next && next === text_actual) next == null
			const local = this.data()

			if (next === undefined) return local[key] ?? text_actual ?? ''

			const text_local = this.data({ [key]: next })[key]

			return text_local ?? text_actual ?? ''
		}

		@ $mol_mem_key
		item(id: string) {
			return this.$.$yuf_localizer_key_model.make({
				id: $mol_const(id),
				text_main: () => (this.main() ?? this).key_text(id),
				text_actual: () => this.actual()[id] ?? null,
				text: next => this.key_text(id, next)
			})
		}

	}
}
