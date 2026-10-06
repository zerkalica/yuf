namespace $.$$ {
	type Adopted = {
		t: string
		id: string
	}

	export class $yuf_drag_group extends $.$yuf_drag_group {
		@ $mol_mem
		override rows() {
			return this.ids().map(id => this.Item_drag(id))
		}

		override id(id: string) { return id }

		override adopted_id(some: unknown) {
			return some && typeof some === 'object' && (some as Adopted).t === this.param()
				? (some as Adopted).id
				: undefined
		}

		@ $mol_action
		protected self_dragged(next?: boolean) {
			return this.$.$yuf_drag_item.self_dragged(next)
		}

		@ $mol_action
		override receive(dragged: unknown) {
			const dragged_id = this.adopted_id(dragged)
			if ( ! dragged_id ) return
			if (this.is_before([ dragged_id ])) return
			this.self_dragged(true)

			this.item_move(dragged_id)
		}

		override is_before([ dragged_id, before_id ]: [string, string?]) {
			const ids = this.ids()
			if (before_id === undefined) return dragged_id === ids.at(-1)
			return ids.indexOf(dragged_id) === ids.indexOf(before_id) - 1
		}

		override receive_before(before_id: string, dragged: unknown) {
			const dragged_id = this.adopted_id(dragged)
			if ( ! dragged_id ) return
			if (dragged_id === before_id) return
			if (this.is_before([ dragged_id, before_id ])) return

			this.self_dragged(true)

			// $mol_wire_async(this)
			this.item_move(dragged_id, before_id)
		}

	}
}
