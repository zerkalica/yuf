namespace $.$$ {
	export class $yuf_drag_item extends $.$yuf_drag_item {

		uri_param(uri: string) {
			return uri.match(`${this.param()}=\([a-f,0-9,\-~]+\)`)?.[1]
		}

		override adopt( transfer : DataTransfer ) {
			const uri = transfer.getData( 'text/uri-list' )
			if( !uri ) return
			const id = this.uri_param(uri)

			return { t: this.param(), id }
		}

		@ $mol_mem
		override task_uri() {
			return this.$.$mol_state_arg.link({
				[this.param()]: this.id(),
			})
		}

		override receive(next?: ReturnType<$.$yuf_drag_item['receive_before']>) {
			$mol_wire_async(this).receive_before(next)
		}

		static last_received = undefined as undefined | Object

		override remove_event(e?: Event) {
			return new this.$.$mol_after_timeout(10, () => {
				if(this.self_dragged()) return
				this.remove(e)
			})
		}

		protected self_dragged(next?: boolean) {
			return this.$.$yuf_drag_item.self_dragged(next)
		}

		static self_dragged(next?: boolean) {
			const ref = this.constructor as { last_received?: Object }
			if (next !== undefined) ref.last_received = this
			return ref.last_received === this
		}

		@ $mol_mem
		override start_event(e?: DragEvent) {
			const crt = this.Drag_image()?.dom_node()
			if (! crt) return
			let x = 0
			let y = 0
			if (this.drag_align() === 'center') {
				x = crt.clientWidth / 2
				y = crt.clientHeight / 2
			}
			e?.dataTransfer?.setDragImage(crt, x, y)
		}
	}
}
