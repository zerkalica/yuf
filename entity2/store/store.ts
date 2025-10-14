namespace $ {

	export class $yuf_entity2_store extends $yuf_entity2 {
		override defaults( raw?: [] ) {
			return [ ...raw ?? [] ] as readonly string[]
		}

		@ $mol_mem
		ids(next?: readonly string[], cache?: 'cache' | 'remove'): readonly string[] {
			const prev = $mol_wire_probe(() => this.ids()) ?? []
			if (next && cache === 'remove') next = prev.filter(id => ! next?.includes(id))

			const current = this.data(
				next as ReturnType<this['defaults']>,
				cache ? 'cache' : undefined
			) ?? [] as readonly string[]

			let tmp_id = this.tmp_id()

			if ( cache === 'remove' && tmp_id && next?.includes(tmp_id) ) {
				tmp_id = this.tmp_id(null)
			}

			return tmp_id ? [ tmp_id, ... current ] : current
		}

		@ $mol_mem
		tmp_id(next?: null, create?: 'create') {
			return create ? 'draft_' + $mol_guid() : next ?? null
		}

		draft_create() {
			return this.by_id(this.tmp_id(null, 'create')!)
		}

		@ $mol_mem_key
		by_id(id: string): $yuf_entity2 {
			throw new Error(`Implement ${this}.by_id()`)
		}

		remove_item(id: string) {
			this.by_id(id).remove()
			this.ids([ id ], 'remove')
		}
	}
}
