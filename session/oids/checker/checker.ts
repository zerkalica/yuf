namespace $ {
	export class $yuf_session_oids_checker extends $mol_object {
		src() { return '' }
		check_timeout() { return 5000 }
		message() { return '' }
		origin() { return '' }

		@ $mol_mem
		protected frame() {
			const frame = this.$.$mol_dom.document.createElement( 'iframe' )
			frame.src = this.src()
			frame.sandbox = 'allow-storage-access-by-user-activation allow-scripts allow-same-origin'
			frame.title = 'keycloak-session-iframe'
			frame.style.display = 'none'
			frame.onerror = e => this.on_error(e)
			frame.onload = () => $mol_wire_async(this).check()

			const cb = $mol_wire_async((e: MessageEvent) => this.on_message(e))

			this.$.$mol_dom_context.addEventListener('message', cb, false)

			const destructor = () => {
				this.$.$mol_dom_context.removeEventListener('message', cb)
				this.timeout?.destructor()
				$mol_wire_probe(() => this.frame())?.frame.remove()
			}

			return { frame, destructor }
		}

		check() {
			const win = $mol_wire_probe( () => this.frame())?.frame.contentWindow
			const msg = this.message()
			const origin = this.origin()
			if (! msg || ! origin || ! win) return
			// set error if iframe not answer
			this.timeout = new this.$.$mol_after_timeout(this.check_timeout(), () => this.changed(true))
			win.postMessage(msg, origin)
		}

		protected timeout = null as null | $mol_after_timeout

		protected on_message(event: MessageEvent) {
			if (event.origin !== origin) return
			const frame = $mol_wire_probe(() => this.frame())?.frame
			if (! frame || frame.contentWindow !== event.source) return
			const data = event.data
			if ( data !== 'changed' && data !== 'unchanged' && data !== 'error' ) return

			if (data === 'error') this.on_error('Frame response error')
			else this.changed(data === 'changed')

			this.timeout?.destructor()
			this.timeout = new this.$.$mol_after_timeout(this.check_timeout(), () => $mol_wire_async(this).check())
		}

		protected on_error(event: string | Event) {
			const msg = typeof event === 'string' ? event : ( event as ErrorEvent ).error
			const err = msg instanceof Error ? msg : new Error(msg, { cause: event })

			try {
				this.changed(err as unknown as boolean)
			} catch (e) {
				if (e !== err) $mol_fail_log(e)
			}
		}

		@ $mol_mem
		changed(next?: boolean) {
			this.frame()
			return next ?? false
		}

	}
}
