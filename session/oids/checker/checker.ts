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
			frame.onerror = event => this.error_push(event)
			frame.onload = () => this.on_load()

			doc.body.appendChild(frame)

			return frame
		}

		on_load() {
			this.on_message_async = $mol_wire_async((e: MessageEvent) => this.on_message(e))
			this.dom().addEventListener('message', this.on_message_async, false)
			this.obsolete(false)
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

			if (data === 'error') this.error_push('No access')
			if (data === 'changed') this.obsolete(true)

			this.timeout?.destructor()
			this.timeout = new this.$.$mol_after_timeout(this.check_timeout(), () => this.obsolete(false))
		}

		protected on_message_async = null as null | typeof this.on_message

		protected error_push(event: string | Event) {
			try {
				const err = typeof event === 'string'
					? new Error(event)
					: ( event as ErrorEvent ).error as Error

				// fatal error loading iframe - status throws exceptions
				this.obsolete(err as unknown as boolean)
			} catch (e) {
				$mol_fail_log(e)
			}
		}

		@ $mol_mem
		obsolete(next?: boolean) {
			if (next) return next

			const win = this.frame().contentWindow
			const msg = this.message()
			const origin = this.origin()
			if (! msg || ! origin || ! win) return false

			// set error if iframe not answer or load timeout
			this.timeout?.destructor()
			this.timeout = new this.$.$mol_after_timeout(this.check_timeout(), () => this.error_push('timeout'))

			// Send if onload setups on_message_async
			this.on_message_async && win.postMessage(msg, origin)

			return next ?? false
		}

	}
}
