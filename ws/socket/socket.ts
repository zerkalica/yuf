namespace $ {
	export class $yuf_ws_socket extends $mol_object {
		readonly id = $mol_guid()
		protected _native: WebSocket | null = null

		url_debug() { return this.$.$mol_state_arg.value('ws_url') }
		url() { return '/ws' }
		protocols() { return [] as string[] }

		native() {
			if (this._native) return this._native
			let url = this.url_debug() || this.url()

			if (! url.match(/^wss?\:/)) {
				url = this.$.$mol_dom_context.location.origin.replace('http', 'ws') + url
			}

			const ws = this._native = new WebSocket( url, this.protocols() )

			ws.onerror = e => this.onerror(e)
			ws.onclose = e => this.onclose(e)
			ws.onmessage = message => this.onmessage(message)
			ws.onopen = () => this.onopen()

			return ws
		}

		send(data: Parameters<WebSocket['send']>[0]) { return this.native().send(data) }

		get readyState() { return this.native()?.readyState ?? WebSocket.CLOSED }

		onerror(error: Event) {}
		onclose(error: CloseEvent) {}
		onmessage(e: MessageEvent) {}
		onopen() {}

		override destructor() {
			const ws = this._native
			if (! ws) return
			ws.onerror = null
			ws.onclose = null
			ws.onmessage = null
			ws.onopen = null
			const state = ws.readyState
			if (state === WebSocket.CLOSED) return null
			if (state === WebSocket.CLOSING) return null
			ws.close()
		}
	}

}
