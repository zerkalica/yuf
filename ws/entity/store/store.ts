namespace $ {

	export class $yuf_ws_entity_store extends $yuf_ws_entity {
		override defaults( raw?: [] ) {
			return [ ...raw ?? [] ] as readonly string[]
		}

		override device() {
			return this.id() ? [ this.id() ] : []
		}

		@ $mol_mem
		tmp_id(next?: string | null) {
			return next ?? null
		}

		@ $mol_action
		draft_saved() {
			const id = this.tmp_id()
			if (! id ) return null
			this.tmp_id(null)
			this.ids([... this.ids(), id ])
			return null
		}

		@ $mol_mem
		ids(next?: readonly string[], cache?: 'cache' | 'append' | 'prepend' | 'remove'): readonly string[] {
			const prev = $mol_wire_probe(() => this.ids()) ?? []
			if (next && cache === 'remove') next = prev.filter(id => ! next?.includes(id))
			if (next && cache === 'append') next = [ ...prev, ...next ]
			if (next && cache === 'prepend') next = [ ...next, ...prev ]

			const ids = this.data(next as ReturnType<this['defaults']>, cache ? 'cache' : undefined) ?? [] as readonly string[]

			let tmp_id = this.tmp_id()
			if (tmp_id && ids.includes(tmp_id)) tmp_id = this.tmp_id(null)
			return tmp_id ? [ tmp_id, ... ids ] : ids
		}

		@ $mol_action
		create_draft() {
			const id = $mol_guid()
			const item = this.by_id(id)
			// prevent fetching on read prop
			item.data({}, 'cache')
			this.tmp_id(id)

			return item as ReturnType<this['by_id']>
		}

		@ $mol_mem_key
		by_id(id: string) {
			return this.$.$yuf_ws_entity.make({
				id: $mol_const(id),
				ws: () => this.ws(),
				device: () => this.device(),
			})
		}

		remove_all() {
			this.data(null)
		}

		remove(id: string) {
			this.by_id(id).data(null)
			this.ids([ id ], 'remove')
		}
	}
}
