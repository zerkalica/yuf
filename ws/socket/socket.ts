namespace $ {
	export class $yuf_ws_socket extends $mol_object {
		protected destructing = false

		readonly id = $mol_guid()
		protected _native: WebSocket | null = null

		url() { return '' }
		protocols() { return [] as string[] }

		native() {
			if (this._native) return this._native
			let url = this.url()

			if (! url.match(/^wss?\:/)) {
				url = this.$.$mol_dom_context.location.origin.replace('http', 'ws') + url
			}

			try {
				url = this.url()
				const ws = this._native = new WebSocket( url, this.protocols() )

				ws.onerror = e => this.destructing ? null : this.onerror(e)
				ws.onclose = e => this.destructing ? null : this.onclose(e)
				ws.onmessage = message => this.destructing ? null : this.onmessage(message)
				ws.onopen = () => this.destructing ? null : this.onopen()

				return ws
			} catch (e) {
				if ($mol_promise_like(e)) $mol_fail_hidden(e)

				if (e instanceof Error && ! (e instanceof $mol_error_mix)) {
					e = new $mol_error_mix('Cant create socket, ' + e.message + ': ' + url, this, e as Error)
				}

				this.onerror({
					code: 1007,
					wasClean: false,
					target: e,
				} as CloseEvent)

				return null
			}
		}

		send(data: Parameters<WebSocket['send']>[0]) { return this.native()?.send(data) }

		get readyState() { return this.native()?.readyState ?? WebSocket.CLOSED }

		onerror(error: Event) {}
		onclose(error: CloseEvent) {}
		onmessage(e: MessageEvent) {}
		onopen() {}

		override destructor() {
			if (this.destructing) return
			this.destructing = true

			this._native?.close()
		}
	}

}
