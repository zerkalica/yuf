namespace $ {
	export class $yuf_karaoke_store extends $yuf_ws_entity_store {
		type() { return 'karaokes' }
		@ $mol_mem_key
		override by_id(id: string) {
			return this.$.$yuf_karaoke_model.make({
				_id: id,
			})
		}
	}
}
