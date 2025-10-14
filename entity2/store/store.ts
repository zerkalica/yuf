namespace $ {

	export class $yuf_entity2_store<Item = string> extends $yuf_entity2 {
		override defaults( raw?: [] ) {
			return [ ...raw ?? [] ] as readonly Item[]
		}

		@ $mol_mem
		ids(next?: readonly string[], cache?: 'cache'): readonly string[] {
			const data = (this.data(
				next as ReturnType<this['defaults']>,
				cache ? 'cache' : undefined
			) ?? []) as readonly string[]

			let tmp_id = this.tmp_id()

			return tmp_id ? [ tmp_id, ... data ] : data
		}

		@ $mol_mem
		tmp_id(next?: null, create?: 'create') {
			return create ? 'draft_' + $mol_guid() : next ?? null
		}

		draft_create() {
			return this.by_id(this.tmp_id(null, 'create')!) as ReturnType<this['by_id']>
		}

		@ $mol_mem_key
		by_id(id: string): $yuf_entity2 {
			throw new Error(`Implement ${this}.by_id()`)
		}

		@ $mol_action
		remove_item(id: string) {
			this.by_id(id).remove()

			if (this.tmp_id() === id) {
				this.tmp_id(null)
				return
			}

			const ids = this.ids()
			const next = ids.filter(cur => cur !== id)
			if (ids.length !== next.length) this.ids(next, 'cache')
		}
	}
}
