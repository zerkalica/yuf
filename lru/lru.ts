namespace $ {
	/**
	 * const lru = $yuf_lru.make({
	 *   limit: $mol_const(3 * 24 * 60 * 60 * 1000)
	 *   remove: key => this.$.$mol_state_local.value(key, null),
	 * })
	 * 
	 * function my_val(id: string, next?: string) {
	 *   lru.track(id)
	 *   return this.$.$mol_state_local.value(id, next)
	 * }
	*/
	export class $yuf_lru extends $mol_object {
		protected id_time(next?: Record<string, number | undefined>): Record<string, number | undefined> {
			return this.$.$mol_store_local.value(`$yuf_lru.id_time(${this.limit()})`, next) ?? {}
		}

		limit() { return 2 * 24 * 60 * 60 * 1000 }

		protected clean_old() {
			// debounce
			const prev = this.id_time()
			const next = { ...prev, ...this.tmp }
			const limit = this.limit()
			const current = Date.now()

			for (let key in prev) {
				const diff = current - (prev[key] ?? 0)
				if (diff < limit) continue

				this.remove(key)
				delete next[key]
			}

			this.id_time(next)
			this.tmp = {}

			return null
		}

		remove(key: string) {}

		protected clean_task = $mol_wire_async(() => this.clean_old())

		protected tmp = {} as Record<string, number>

		@ $mol_mem_key
		track(id: string) {
			this.tmp[id] = Date.now()
			new $mol_after_work(30_000, this.clean_task)
			return null
		}
	}
}
