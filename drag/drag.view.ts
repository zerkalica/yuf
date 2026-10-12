namespace $.$$ {

	export class $yuf_drag extends $.$yuf_drag {

		override args() { return { [this.param()]: this.id() } }
		override uris() { return this.$.$mol_state_arg.link(this.args()) }

		override start(e?: DragEvent) {
			const crt = this.Drag_image()?.dom_node()
			if ( crt ) {
				let x = 0
				let y = 0
				if (this.drag_align() === 'center') {
					x = crt.clientWidth / 2
					y = crt.clientHeight / 2
				}
				e?.dataTransfer?.setDragImage(crt, x, y)
			}

			this.$.$yuf_drop.dragging.add(this.uris())
		}

		override end(e?: Event) {
			new this.$.$mol_after_frame($mol_wire_async(() => {
				const uris = this.uris()
				if (! this.$.$yuf_drop.dragging.has(uris)) return
				$mol_error_fence( () => this.remove(e), e => ($mol_fail_log(e), null))
				this.$.$yuf_drop.dragging.delete(uris)
			}))
		}


	}
}
