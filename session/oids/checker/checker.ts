namespace $ {
	export class $yuf_session_oids_checker extends $mol_object {
		src() { return '' }
		ping_timeout() { return 5000 }
		message() { return '' }
		origin() { return '' }

		@ $mol_mem
		protected frame() {
			const frame = this.$.$mol_dom.document.createElement( 'iframe' )
			frame.src = this.src()
			frame.sandbox = 'allow-storage-access-by-user-activation allow-scripts allow-same-origin'
			frame.title = 'keycloak-session-iframe'
			frame.style.display = 'none'
			frame.onload = () => this.ping()

			const cb = $mol_wire_async((e: MessageEvent) => this.on_message(e))

			this.$.$mol_dom_context.addEventListener('message', cb, false)

			const destructor = () => {
				this.$.$mol_dom_context.removeEventListener('message', cb)
				this.timeout?.destructor()
				$mol_wire_probe(() => this.frame())?.frame.remove()
			}

			return { frame, destructor }
		}

		protected timeout = null as null | $mol_after_timeout
		protected ping() {
			const win = $mol_wire_probe( () => this.frame())?.frame.contentWindow
			const msg = this.message()
			msg && win && win.postMessage(msg, this.origin())
			this.timeout = new this.$.$mol_after_timeout(this.ping_timeout(), () => this.ping())
		}

		protected on_message(event: MessageEvent) {
			const frame = $mol_wire_probe(() => this.frame())?.frame
			if (! frame) return
			if (event.origin !== origin) return
			if (frame.contentWindow !== event.source) return
			const data = event.data
			if (! data ) return
			this.data(data)
		}

		@ $mol_mem
		protected data(next?: 'changed' | 'unchanged' | 'error' | null) {
			return next ?? null
		}

		status(reset?: null) {
			this.frame()
			return this.data(reset)
		}

	}
}
