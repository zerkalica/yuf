namespace $ {

	export class $yuf_entity2_store<Item = string> extends $yuf_entity2<readonly Item[]> {
		override defaults( raw?: [] ) {
			return [ ...raw ?? [] ] as readonly Item[]
		}

		ids(next?: readonly string[], cache?: 'cache') {
			return (this.data(next as readonly Item[], cache) ?? []) as readonly string[]
		}

		store_id() { return this.toString() }

		protected draft_id_create() { return $mol_guid() }

		draft_optimistic(draft_id: string) { return false }

		@ $mol_action
		draft_done(draft_id: string) {
			if (! this.draft_optimistic(draft_id) ) return

			const ids = $mol_wire_probe(() => this.ids())
			if ( ! ids || ids.includes(draft_id) ) return

			this.ids([ draft_id, ... ids ], 'cache')
		}

		@ $mol_action
		draft_create() {
			const id = this.draft_id_create()
			this.$.$yuf_entity2.draft_add(id)

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
