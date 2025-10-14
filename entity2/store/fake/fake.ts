namespace $ {
	export class $yuf_entity2_store_fake<Item extends {}> extends $yuf_entity2_store<Item> {
		@ $mol_mem
		protected data_normalized(
			next?: null | Record<string, Partial<Item> | null>,
			cache?: 'cache'
		): Record<string, Item | null> | null {
			const prev = $mol_wire_probe(() => this.data_normalized())

			next = next ? { ... prev, ...next } : next

			const items = next ? Object.values(next).filter($mol_guard_defined) : next

			const data = (
				this.data(items as ReturnType<this['defaults']> | null | undefined, cache) ?? []
			) as readonly Item[]

			const result = {} as Record<string, Item | null>

			for (let i = 0; i < data.length; i++) {
				const id = String(i + 1)
				result[id] = data[i]
			}

			return result
		}

		@ $mol_mem
		ids() { return Object.keys(this.data_normalized() ?? {}) }

		@ $mol_mem_key
		protected row_data(id: string, patch?: Partial<Item> | null, cache?: 'cache'): Item | null {
			return this.data_normalized(patch === undefined ? patch :  { [id]: patch }, cache)?.[id] ?? null
		}
	}
}
