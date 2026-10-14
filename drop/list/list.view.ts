namespace $.$$ {
	export class $yuf_drop_list extends $.$yuf_drop_list {
		
		override receive_id(before_id: string, dragged_id: string) {
			if (before_id === '0') before_id = ''
			if (this.item_move().length) return null // prevent drag, while syncing
			this.item_move([ before_id, dragged_id ])
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

		override ids_current() {
			const next_ids = this.ids_next()
			const actual = this.ids_actual()
			return next_ids.length ? next_ids : actual
		}

		override id(id: string) { return id }

		override items() { return this.ids_filtered().map(id => this.Drop(id)) }

		@ $mol_mem
		override status() {
			const next_ids = this.ids_next()
			if (! next_ids.length) return null
			this.item_move() // to retry
			this.ids_actual(next_ids)
			this.item_move([])

			return null
		}

		override item_pending(id: string) { return this.item_move()[1] === id ? (this.error(), null) : null }
		override Item_status(id: string) {
			if (this.item_move()[1] !== id) return null
			return this.Status()
		}

		override error() { return $mol_error_fence(() => this.status(), e => [ e ])?.[0] ?? null }
		override error_message() { return this.$.$mol_error_message(this.error()) }

		override Status() {
			return this.error() ? this.Cancel_button() : null
		}

		override retry(e?: Event) {
			const [before_id, dragged_id, version] = this.item_move()
			if (! dragged_id) return null

			const version_str = String(Number(version || 0) + 1)
			this.item_move([ before_id, dragged_id, version_str ])
		}

		override cancel(e?: Event) { this.item_move([]) }

	}
}
