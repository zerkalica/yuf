namespace $ {
	export class $yuf_session_oids_checker extends $mol_object {
		src() { return '' }
		check_timeout() { return 5000 }
		message() { return '' }
		origin() { return '' }

		dom() { return this.$.$mol_dom_context }

		@ $mol_mem
		protected frame() {
			const src = this.src()
			const doc = this.dom().document

			const frame = doc.createElement( 'iframe' )
			frame.src = src
			frame.sandbox = 'allow-storage-access-by-user-activation allow-scripts allow-same-origin'
			frame.title = 'keycloak-session-iframe'
			frame.style.display = 'none'
			frame.onerror = event => this.status(event as string | ErrorEvent)
			frame.onload = () => this.on_load()

			doc.body.appendChild(frame)

			return frame
		}

		on_load() {
			this.on_message_async = $mol_wire_async((e: MessageEvent) => this.on_message(e))
			this.dom().addEventListener('message', this.on_message_async, false)
			this.status(null)
		}

		override destructor() {
			this.on_message_async && this.dom().removeEventListener('message', this.on_message_async)
			this.timeout?.destructor()
			$mol_wire_probe(() => this.frame())?.remove()
		}

		protected timeout = null as null | $mol_after_timeout

		protected on_message(event: MessageEvent) {
			const origin = this.origin()
			if (event.origin !== origin) return

			const frame = this.frame()
			if (! frame || frame.contentWindow !== event.source) return

			const data = event.data

			if (data === 'error') this.status('Status iframe token error')
			if (data === 'changed') this.status('Status iframe token changed')

			this.timeout?.destructor()
			this.timeout = new this.$.$mol_after_timeout(this.check_timeout(), () => this.status(null))
		}

		protected on_message_async = null as null | typeof this.on_message

		@ $mol_mem
		status(next?: string | ErrorEvent | null) {
			if (next) {
				return typeof next === 'string'
					? next
					: String(next.error?.message || next.error || 'Status iframe unknown error')
			}

			const win = this.frame().contentWindow
			const msg = this.message()
			const origin = this.origin()
			if (! msg || ! origin || ! win) return null

			// set error if iframe not answer or load timeout
			this.timeout?.destructor()
			this.timeout = new this.$.$mol_after_timeout(this.check_timeout(), () => this.status('Status iframe load timeout'))

			// Send if onload setups on_message_async
			this.on_message_async && win.postMessage(msg, origin)

			return null
		}

	}
}
