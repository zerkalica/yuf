namespace $.$$ {
	type Adopted = Record<string, any>

	export class $yuf_drop extends $.$yuf_drop {
		static dragging = new Set<string>()

		@ $mol_action
		override adopt( transfer : DataTransfer ) {
			const uri = transfer.getData( 'text/uri-list' )

			const dict = Object.fromEntries(uri.split('/').map(chunk => chunk.split('=').map(decodeURIComponent)))

			const dragging_id = ! uri ? null : dict[this.param()] ?? null
			if (dragging_id === null) return null as any // unknown item dragged

			const self_id = this.id()

			if (dragging_id === self_id) return null as any // dragged to itself

			if (this.is_before(dragging_id)) return null as any

			this.$.$yuf_drop.dragging.delete(uri)

			return { [this.param()] : dragging_id }
		}

		override adopted_id(adopted: Adopted) { return adopted[this.param()] ?? '' }

		override is_before(moved_id: string) {
			const ids = this.ids()
			const before_id = this.id()
			if (! before_id) return moved_id === ids.at(-1)
			return ids.indexOf(moved_id) === ids.indexOf(before_id) - 1
		}

		override receive(dragged: Adopted) {
			const moved_id = this.adopted_id(dragged)
			this.receive_id(moved_id)
		}

	}
}
