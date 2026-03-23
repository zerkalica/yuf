namespace $ {
	/**
	 * const lru = $yuf_lru.make({
	 *   // keep last 3 days
	 *   limit: $mol_const(3 * 24 * 60 * 60 * 1000)
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
			this.$.$mol_wait_timeout(200)

			const prev = this.id_time()
			let next = prev
			const limit = this.limit()
			const current = Date.now()

			for (let key in prev) {
				const diff = current - (prev[key] ?? 0)
				if (diff < limit) continue

				this.value_remove(key)
				if (next === prev) next = { ... prev }
				delete next[key]
			}

			this.id_time({ ...this.tmp, ...next })
			this.tmp = {}

			return null
		}

		value_remove(key: string) {
			this.$.$mol_store_local.value(key, null)
		}

		protected clean_task = $mol_wire_async(() => this.clean_old())

		protected tmp = {} as Record<string, number>

		@ $mol_mem_key
		track(id: string) {
			this.tmp[id] = Date.now()
			new $mol_after_frame(this.clean_task)
			return null
		}
	}
}
