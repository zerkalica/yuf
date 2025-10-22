namespace $ {

	export class $yuf_entity2_store<Item = string> extends $yuf_entity2<readonly Item[]> {
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

		tmp_id_server_accepted() { return true }

		@ $mol_mem
		tmp_id(next?: string) {
			if (next === '') {
				next = $mol_guid()
				this.$.$yuf_entity2.tmp_ids([ next ])
				return next
			}

			if (next) {
				this.$.$yuf_entity2.tmp_ids([ next ], 'remove')
				this.tmp_id_server_accepted() && this.ids([ ... this.ids(), next ], 'cache')
				return null
			}

			return next ?? null
		}

		draft_create() {
			const id = this.tmp_id('')!

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
