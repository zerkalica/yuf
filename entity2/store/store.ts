namespace $ {

	export class $yuf_entity2_store<Item = string> extends $yuf_entity2<readonly Item[]> {
		override defaults( raw?: [] ) {
			return [ ...raw ?? [] ] as readonly Item[]
		}

		ids(next?: readonly string[], cache?: 'cache') {
			return (this.data(next as readonly Item[], cache) ?? []) as readonly string[]
		}

		store_id() { return this.toString() }

		protected tmp_id_create() { return $mol_guid() }

		protected tmp_id_server_accepted() { return true }

		@ $mol_action
		ids_cache_add(id: string) {
			this.ids([ id, ... this.ids() ], 'cache')
		}

		@ $mol_action
		tmp_id_remove(id: string) {
			this.tmp_id(null)
		}

		protected tmp_id(next?: string | null) {
			return this.$.$yuf_entity2.tmp_id(this.store_id(), next)
		}

		@ $mol_action
		draft_create() {
			const id = this.tmp_id(this.tmp_id_create())!

			return this.by_id(id) as ReturnType<this['by_id']>
		}

		@ $mol_mem_key
		by_id(id: string): $yuf_entity2<{}> {
			throw new Error(`Implement ${this}.by_id()`)
		}

		@ $mol_action
		remove_item(id: string) {
			this.by_id(id).remove()

			if (this.tmp_id() === id) {
				this.tmp_id(id)
				return
			}

			const ids = $mol_wire_probe(() => this.ids())
			if (! ids) return
			const next = ids.filter(cur => cur !== id)
			if (ids.length !== next.length) this.ids(next, 'cache')
		}
	}
}
