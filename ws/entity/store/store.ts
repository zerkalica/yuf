namespace $ {

	export class $yuf_ws_entity_store extends $yuf_ws_entity {
		override defaults( raw?: [] ) {
			return [ ...raw ?? [] ] as readonly string[]
		}

		override device() {
			return this.id() ? [ this.id() ] : []
		}

		protected factory() {
			return this.constructor as typeof $yuf_ws_entity_store
		}

		@ $mol_action
		pick_id() {
			return $mol_guid()
		}

		@ $mol_mem
		ids(next?: readonly string[], cache?: 'cache' | 'append' | 'prepend' | 'remove'): readonly string[] {
			const prev = $mol_wire_probe(() => this.ids()) ?? []
			if (next && cache === 'remove') next = prev.filter(id => ! next?.includes(id))
			if (next && cache === 'append') next = [ ...prev, ...next ]
			if (next && cache === 'prepend') next = [ ...next, ...prev ]

			return this.data(
				next as ReturnType<this['defaults']>,
				cache ? 'cache' : undefined
			) ?? [] as readonly string[]
		}

		@ $mol_action
		draft_create() {
			const id = this.pick_id()
			const model = this.by_id(id)
			model.draft({ id }, 'creating')

			return model
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
