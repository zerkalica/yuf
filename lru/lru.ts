namespace $ {
	/**
	 * const lru = $yuf_lru.make({
	 *   size_max: () => 10_000,
	 *   size: key => JSON.stringify(this.$.$mol_state_local.value(key)).length,
	 *   remove: key => this.$.$mol_state_local.value(key, null),
	 * })
	 * 
	 * function my_val(id: string, next?: string) {
	 *   lru.track(id)
	 *   return this.$.$mol_state_local.value(id, next)
	 * }
	*/
	export class $yuf_lru extends $mol_object {
		protected id_time(next?: readonly string[]): readonly string[] {
			return this.$.$mol_store_local.value(`$yuf_lru.id_time(${this.size_max()})`, next) ?? []
		}

		remove(id: string) {}
		size(id: string) { return 10 }
		size_max() { return 100_000 }

		@ $mol_action
		add(id: string) {
			let prev = this.id_time()
			const size_max = this.size_max()

			let actual_start = 0
			let id_index = -1

			for (let size = 0, index = 0; index < prev.length; index++) {
				const current_id = prev[index]
				if (current_id === id) id_index = index

				size += this.size(current_id)

				while (size > size_max) {
					size -= this.size(prev[actual_start++])
				}
			}

			const next = prev.slice(actual_start)
			if (id_index >= 0 && id_index - actual_start >= 0) {
				next.splice(id_index - actual_start, 1)
			}
			next.push(id)

			this.id_time(next)
		}

		@ $mol_mem_key
		track(id: string) {
			this.add(id)
			return null
		}
	}
}
