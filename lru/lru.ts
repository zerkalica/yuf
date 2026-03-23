namespace $ {
	export class $yuf_lru extends $mol_object {
		key() {
			return `$yuf_lru.ids(${this.max()})`
		}

		ids(next?: readonly string[]): readonly string[] {
			return this.$.$mol_store_local.value(this.key(), next) ?? []
		}

		max() { return 1_000 }

		raw<Value>(id: string, next?: Value | null): Value | null {
			return next ?? null
		}

		size(id: string) { return JSON.stringify(this.raw(id)).length }

		remove(id: string) { this.raw(id, null) }

		value<Value>(id: string, next?: Value | null) {
			const val = this.raw(id, next)

			if (next !== undefined) this.add(id)

			return val
		}

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
