namespace $ {

	export class $yuf_ws_entity_store extends $yuf_ws_entity {
		override defaults( raw?: [] ) {
			return [ ...raw ?? [] ] as readonly string[]
		}

		override device() {
			return this.id() ? [ this.id() ] : []
		}

		@ $mol_mem
		protected tmp_id(next?: string | null) {
			return next ?? null
		}

		@ $mol_mem
		ids(next?: readonly string[], cache?: 'cache') {
			const ids = this.data(next as ReturnType<this['defaults']>, cache) ?? [] as readonly string[]
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

			return item
		}

		@ $mol_mem_key
		by_id(id: string) {
			return this.$.$yuf_ws_entity.make({
				id: $mol_const(id),
				ws: () => this.ws(),
				device: () => this.device(),
			})
		}
	}
}
