namespace $.$$ {
	export class $yuf_drop_list extends $.$yuf_drop_list {
		
		override receive(before_id: string, adopted?: Record<string, string>) {
			if (before_id === '0') before_id = ''

			const dragged_id = adopted?.[this.param()]
			if (! dragged_id ) return null
			if (this.dragged_id()) return null // prevent drag, while syncing

			this.dragged_id(dragged_id)
			this.before_id(before_id)
			return dragged_id
		}

		override receive_outside(dragged_id: string) {
			if (this.dragged_id()) return null // prevent drag, while syncing
			this.dragged_id(dragged_id)
			this.before_id(null)
			return dragged_id
		}

		@ $mol_action
		ids_actual_grab() { return this.ids_actual() }

		@ $mol_mem
		override ids_next() {
			const dragged_id = this.dragged_id()
			const before_id = this.before_id()
			if (! dragged_id ) return []

			const ids = this.ids_actual_grab().filter(id => id !== dragged_id)
			if (before_id === null) return ids // remove
			const target_index = ! before_id ? ids.length : ids.indexOf(before_id)

			return ids.toSpliced(target_index, 0, dragged_id)
		}

		override ids_current() {
			const actual = this.ids_actual()
			return this.dragged_id() ? this.ids_next() : actual
		}

		override id(id: string) { return id }

		@ $mol_mem
		override items() {
			const ids = this.ids_filtered()
			return ids.map(id => this.Drop(id))
		}

		@ $mol_mem
		override status() {
			const next_ids = this.ids_next()
			if (! next_ids.length) return null
			this.retry_count()
			this.ids_actual(next_ids)

			this.cancel(null)
			// new $mol_after_frame(() =>this.cancel(null))

			return null
		}

		override item_pending(id: string) { return this.dragged_id() === id ? (this.error(), null) : null }
		override Item_status(id: string) { return this.dragged_id() === id ? this.Status() : null }
		override error() { return $mol_error_fence(() => this.status(), e => [ e ])?.[0] ?? null }
		override error_message() { return this.$.$mol_error_message(this.error()) }
		override Status() { return this.error() ? this.Cancel_button() : null }

		override retry(e?: Event | null) {
			if (this.dragged_id()) this.retry_count(this.retry_count() + 1)
			return null
		}

		override cancel(e?: Event | null) {
			this.dragged_id(null)
			this.before_id(null)
			return null
		}

	}
}
