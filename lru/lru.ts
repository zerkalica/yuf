namespace $ {
	export class $yuf_lru extends $mol_object {
		ids(next?: readonly string[]): readonly string[] {
			return this.$.$mol_store_local.value(`$yuf_lru.id_time(${this.max()})`, next) ?? []
		}

		max() { return 1_000 }

		size(id: string) { return 1 }
		remove(id: string) {}

		@ $mol_action
		add(id: string) {
			let next = this.ids().filter(src => src !== id)
			next.push(id)
			const size_max = this.max()

			let size = 0
			let index = next.findLastIndex(key => (size += this.size(key)) > size_max)

			index ++
			for (let i = 0; i < index; i++) {
				this.remove(next[i])
			}

			next = next.slice(index)

			this.ids(next)
		}
	}
}
