namespace $.$$ {

	export class $yuf_drag extends $.$yuf_drag {

		override args() { return { [this.param()]: this.id() } }
		override uris() { return this.$.$mol_state_arg.link(this.args()) }

		override start(e?: DragEvent) {
			this.$.$yuf_drop.dragging.add(this.uris())
		}

		override end(e?: Event) {
			new this.$.$mol_after_frame($mol_wire_async(() => {
				const uris = this.uris()
				if (! this.$.$yuf_drop.dragging.has(uris)) return
				$mol_error_fence( () => this.receive_outside(e), e => ($mol_fail_log(e), null))
				this.$.$yuf_drop.dragging.delete(uris)
			}))
		}

		override destructor() {
			super.destructor()
			if (! this.fix_destruct()) return
			const sub = $mol_wire_probe(() => this.Sub())
			sub?.destructor()
		}
	}
}
