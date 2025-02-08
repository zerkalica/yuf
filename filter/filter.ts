namespace $ {
	export class $yuf_filter<Item> extends $mol_object {
		@ $mol_mem
		count(next?: number | null): number {
			throw new Error('implement')
		}

		@ $mol_mem_key
		chunk(offset: number): undefined | readonly Item[] {
			throw new Error('implement')
		}

		chunk_size() {
			return 100
		}

		@ $mol_mem_key
		page(page: number) {
			$mol_wire_solid()
			return this.chunk(page * this.chunk_size())
		}

		at(offset: number) {
			const limit = this.chunk_size()

			const chunk_index = offset % limit
			const page = Math.floor(offset / limit)

			const chunk = this.page(page)
			const id = chunk?.[chunk_index]

			if (id === undefined) throw new Error('Empty id')

			return id
		}

		reset() {
			this.count(null)
		}

		@ $mol_mem
		rows() {
			return this.$.$mol_range2(index => this.at(index), () => this.count())
		}
	}
}
