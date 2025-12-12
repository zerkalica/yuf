namespace $ {
	export class $yuf_localizer_project_store extends $mol_object {
		@ $mol_mem
		static locales(next?: Record<string, Record<string, string>> | null) {
			return this.$.$mol_state_local.value(`${this}.locales()`, next) ?? {}
		}

		locales(next?: Record<string, Record<string, string>> | null) {
			return this.$.$yuf_localizer_project_store.locales(next) ?? {}
		}

		locales_patchable(next?: Record<string, Record<string, string> | null> | null) {
			const prev = this.locales()
			if (next === undefined) return prev ?? {}

			return this.locales(! next ? next : $yuf_dict_degrease({ ...prev, ... next })) ?? {}
		}

		@ $mol_mem_key
		project(url: string) {
			return this.$.$yuf_localizer_project_model.make({
				url: $mol_const(url),
				data: next => this.locales_patchable(next),
			})
		}

	}
}
