namespace $.$$ {
	type Adopted = Record<string, any>

	export class $yuf_drop extends $.$yuf_drop {
		static dragging = new Set<string>()

		static syncing = new Set<string>()

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

		override enter(e?: DragEvent) {
			if (this.$.$yuf_drop.syncing.has(this.param())) return null
			return super.enter(e)
		}

		override drop(e?: DragEvent) {
			if (this.$.$yuf_drop.syncing.has(this.param())) return null
			return super.drop(e)
		}

		override adopted_id(adopted: Adopted) { return adopted[this.param()] ?? '' }

		override is_before(moved_id: string) {
			const ids = this.ids()
			const before_id = this.id()
			if (! before_id) return moved_id === ids.at(-1)
			return ids.indexOf(moved_id) === ids.indexOf(before_id) - 1
		}

		override sub_error() {
			if ($mol_promise_like(this.receive_status()[0])) return 'Promise'
			return null
		}

		override status_extended() {
			const status = this.status()
			return this.receive_status().length ? 'drag' : status
		}

		override receive(dragged: Adopted) {
			const promise = $mol_wire_async(this).receive_tracked(dragged)
			this.receive_status([
				promise
					.then(e => this.receive_status([]))
					.catch(e => this.receive_status([e]))
			])
		}

		@ $mol_mem
		override receive_status( next?: readonly ( Promise<unknown> | Error )[] ) {
			const syncing = this.$.$yuf_drop.syncing
			if ($mol_promise_like(next?.[0])) syncing.add(this.param())
			else syncing.delete(this.param())

			return next ?? []
		}

		override receive_tracked(dragged: Adopted) {
			const moved_id = this.adopted_id(dragged)
			this.receive_id(moved_id)
		}

		override error() {
			const error = this.receive_status()?.[0]
			if( !error ) return ''

			if( $mol_promise_like(error) ) return $mol_fail_hidden( error )
			return this.$.$mol_error_message( error )

		}

		override Error() { return this.error() ? this.Error_spec() : null }

	}
}
