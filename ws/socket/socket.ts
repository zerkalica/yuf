namespace $ {
	export class $yuf_ws_socket extends $mol_object {
		protected destructing = false

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

			ws.onerror = e => this.destructing ? null : this.onerror(e)
			ws.onclose = e => this.destructing ? null : this.onclose(e)
			ws.onmessage = message => this.destructing ? null : this.onmessage(message)
			ws.onopen = () => this.destructing ? null : this.onopen()

			return ws
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
