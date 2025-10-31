namespace $ {

	export class $yuf_entity2_store<Item = string> extends $yuf_entity2<readonly Item[]> {
		override defaults( raw?: [] ) {
			return [ ...raw ?? [] ] as readonly Item[]
		}

		ids(next?: readonly string[], cache?: 'cache') {
			return (this.data(next as readonly Item[], cache) ?? []) as readonly string[]
		}

		@ $mol_action
		id_remove(id: string) {
			const ids = $mol_wire_probe(() => this.ids())
			if (ids?.length) this.ids(ids.filter(cur => cur !== id), 'cache')
		}

		@ $mol_action
		id_add(id: string) {
			const ids = this.ids() // $mol_wire_probe(() => this.ids())
			if ( ids && ! ids.includes(id) ) this.ids([ id, ... ids ], 'cache')
		}

		protected draft_id_create() { return $mol_guid() }

		store_id() { return this.toString() }

		@ $mol_mem
		draft_ids(next?: string) {
			return this.$.$yuf_entity2.draft_ids_by_store(this.store_id(), next)
		}

		@ $mol_action
		draft_id() {
			let id = this.draft_ids()?.[0]
			if (! id) {
				id = this.draft_id_create()
				this.draft_ids(id)
			}

			return id
		}

		@ $mol_mem_key
		by_id(id: string): $yuf_entity2<{}> {
			throw new Error(`Implement ${this}.by_id()`)
		}

	}
}
