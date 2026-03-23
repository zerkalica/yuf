namespace $ {
	export class $yuf_lru_class extends $mol_object {
		@ $mol_mem
		ids(next?: readonly string[]): readonly string[] {
			if (next) this.clean_schedule()
			return this.$.$mol_store_local.value(this.namespace(), next) ?? []
		}

		namespace() {
			return '$yuf_lru.ids()'
		}

		limit() { return 100 }

		protected clean() {
			this.$.$mol_wait_timeout(500)

			let prev = this.ids()
			const limit = this.limit()
			if (prev.length < limit) return null
			const half = Math.floor(limit / 2)

			for (let i = 0 ; i < half; i++) {
				this.$.$mol_store_local.value(prev[i], null)
			}

			this.ids(prev.slice(half))

			return null
		}

		protected clean_task = $mol_wire_async(() => this.clean())

		protected clean_schedule() {
			return new $mol_after_frame(this.clean_task)
		}

		@ $mol_mem_key
		track(id: string) {
			let prev = this.ids().filter(src => src !== id)
			this.ids([...prev, id])

			return null
		}
	}
}
