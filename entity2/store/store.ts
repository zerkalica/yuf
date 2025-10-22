namespace $ {

	export class $yuf_entity2_store<Item = string> extends $yuf_entity2<readonly Item[]> {
		override defaults( raw?: [] ) {
			return [ ...raw ?? [] ] as readonly Item[]
		}

		ids_actual(next?: readonly string[], cache?: 'cache') {
			return (this.data(next as readonly Item[], cache) ?? []) as readonly string[]
		}

		@ $mol_mem
		ids(next?: readonly string[], cache?: 'cache') {
			return [ ... this.draft_ids(), ...this.ids_actual(next, cache) ]
		}

		@ $mol_action
		ids_add_optimistic(id: string) {
			const ids = this.ids()
			if ( ! ids || ids.includes(id) ) return

			this.ids([ id, ... ids ], 'cache')
		}

		protected draft_id_create() { return $mol_guid() }

		store_id() { return this.toString() }

		@ $mol_mem
		draft_ids(next?: string) {
			return this.$.$yuf_entity2.draft_ids_by_store(this.store_id(), next)
		}

		@ $mol_action
		draft_create() {
			const id = this.draft_id_create()
			this.draft_ids(id)

			return this.by_id(id) as ReturnType<this['by_id']>
		}

		@ $mol_mem_key
		by_id(id: string): $yuf_entity2<{}> {
			throw new Error(`Implement ${this}.by_id()`)
		}

		@ $mol_action
		remove_item(id: string) {
			this.by_id(id).remove()

			const ids = $mol_wire_probe(() => this.ids())
			if (! ids) return

			const next = ids.filter(cur => cur !== id)
			if (ids.length !== next.length) this.ids(next, 'cache')
		}
	}
}
