namespace $.$$ {
	export class $yuf_drop_list extends $.$yuf_drop_list {
		
		override receive_id(before_id: string, dragged_id: string) {
			if (before_id === '0') before_id = ''
			this.item_move([before_id, dragged_id ])
			return dragged_id
		}

		@ $mol_action
		ids_actual_grab() { return this.ids_actual() }

		@ $mol_mem
		override ids_next() {
			const [before_id, dragged_id] = this.item_move()
			if (! dragged_id ) return []

			const ids = this.ids_actual_grab().filter(id => id !== dragged_id)
			const target_index = ! before_id ? ids.length : ids.indexOf(before_id)

			return ids.toSpliced(target_index, 0, dragged_id)
		}

		@ $mol_mem_key
		override item_status(id: string) {
			const [, dragged_id] = this.item_move()
			if (id !== dragged_id) return null

			const next_ids = this.ids_next()

			this.ids_actual(next_ids)

			return null
		}

		override ids_current() {
			const next_ids = this.ids_next()

			return next_ids.length ? next_ids : this.ids_actual()
		}

		override id(id: string) { return id }

		override items() {
			return this.ids_filtered().map(id => this.Drop(id))
		}
	}
}
