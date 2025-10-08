namespace $ {
	export class $yuf_ws_entity_store_fake<Item extends { id: string }> extends $yuf_ws_entity {

		override defaults( raw?: [] ) {
			return [ ...raw ?? [] ] as readonly Item[]
		}

		override device() {
			return this.id() ? [ this.id() ] : []
		}

		@ $mol_mem
		protected data_normalized(
			next?: null | Record<string, Partial<Item> | null>,
			cache?: 'cache'
		): Record<string, Item | null> | null {
			const prev = $mol_wire_probe(() => this.data_normalized())
			next = next ? { ... prev, ...next } : next
			const items = next
				? Object.values(next).filter($mol_guard_defined)
				: next

			const data = this.data(items as ReturnType<this['defaults']> | null | undefined, cache) ?? []

			const result = {} as Record<string, Item | null>

			for (let i = 0; i < data.length; i++) {
				const id = data[i].id ?? String(i || '0')
				result[id] = { ...data[i], id }
			}

			return result
		}

		@ $mol_mem_key
		protected row_data(id: string, patch?: Partial<Item> | null, cache?: 'cache'): Item | null {
			const prev = this.data_normalized()
			if (patch === undefined) return prev?.[id] ?? null

			const next = patch === null ? null : { ...patch as Item, id: patch?.id || id }

			return this.data_normalized({ [id]: next }, cache)?.[id] ?? null
		}

		@ $mol_mem
		ids() {
			return Object.values(this.data_normalized() ?? {}).filter($mol_guard_defined).map(rec => rec?.id ?? '')
		}

		@ $mol_action
		draft_create() {
			const id = this.id_pick()
			const item = this.by_id(id) as ReturnType<this['by_id']>
			// prevent fetching on read prop
			item.data(item.defaults({ id }), 'cache')
			return item
		}

		@ $mol_mem_key
		by_id(id: string) {
			return this.$.$yuf_ws_entity.make({
				id: $mol_const(id),
				ws: () => this.ws(),
				device: () => this.device(),
				actual: (next) => this.row_data(id, next)
			})
		}

		@ $mol_action
		remove_item(id: string) {
			this.row_data(id, null)
		}

		@ $mol_action
		id_pick() {
			const ids = this.ids()
			let id = '1'

			for (let i = 1; i < 1000; i++) {
				id = '' + i
				if (! ids.includes(id)) break
			}
			return id
		}
	}

}
