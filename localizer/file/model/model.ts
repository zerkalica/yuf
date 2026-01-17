namespace $ {
	const dict = $mol_data_dict
	const str = $mol_data_string
	const langs_dto = dict(str)

	export type $yuf_localizer_file_model_filter_type = '' | 'is_new' | 'is_not_used' | 'empty' | 'changed'

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

		@ $mol_mem_key
		data_own(key: 'changed' | 'whole') {
			const data = this.data()
			const keys = key === 'changed' ? Object.keys(data) : this.keys()
			const result = {} as ReturnType<typeof this.data>

			for (const key of keys) {
				const val = data[key]
				result[key] = val || ''
			}

			return result
		}

		protected fetcher() { return this.$.$mol_static.$mol_fetch }

		@ $mol_mem
		actual() {
			$mol_wire_solid()
			const lang_id = this.id()
			let url = this.url()
			if (! url) return {}

			const response = $mol_error_fence(
				() => this.fetcher().success(url),
				e => e.message === $mol_rest_code[$mol_rest_code['Not Found']] ? null : e
			)

			if (! response) return {}

			const res = $mol_error_fence(
				() => langs_dto(response.json() as any),
				e => new $mol_error_mix(e instanceof TypeError ? 'Invalid json' : e.message, { lang_id, url }, e)
			)

			return res
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
			return Object.keys({ ...this.main()?.actual(), ...this.actual() })
		}

		@ $mol_mem_key
		keys_filtered(params: {
			keys_filter?: $yuf_localizer_file_model_filter_type
			mode?: null | 'dupes'
		}) {
			const kf = params.keys_filter
			const keys = [] as string[]
			const map = {} as Record<string, string | null>

			for (const key of this.keys()) {
				const row = this.item(key)
				if (kf === 'is_new' && ! row.is_new()) continue
				if (kf === 'is_not_used' && ! row.is_not_used()) continue
				if (kf === 'empty' && row.text()) continue
				if (kf === 'changed' && ! row.is_changed()) continue
				if (params.mode !== 'dupes') {
					keys.push(key)
					continue
				}

				const val = this.key_text(key)
				if (map[val] === undefined) {
					map[val] = key
					continue
				}

				if (map[val] !== null) keys.push(map[val])
				map[val] = null
				keys.push(key)

			}

			return keys.sort()
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
				text_stored: next => this.key_text(id, next)
			})
		}

	}
}
