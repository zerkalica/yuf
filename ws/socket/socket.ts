namespace $ {
	export class $yuf_ws_socket extends $mol_object {
		protected destructing = false

		readonly native: WebSocket
		readonly id = $mol_guid()

		constructor(
			readonly url: string,
			readonly protocols = [] as string[]
		) {
			super()

			let ws

			try {
				url = url
				ws = new WebSocket( url, protocols )
			} catch (e) {
				if (e instanceof Error && ! (e instanceof $mol_error_mix)) {
					e = new $mol_error_mix('Cant create socket', this, e as Error)
				}
				$mol_fail_hidden(e)
			}

			ws.onerror = e => this.destructing ? null : this.onerror(e)
			ws.onclose = e => this.destructing ? null : this.onclose(e)
			ws.onmessage = message => this.destructing ? null : this.onmessage(message)
			ws.onopen = () => this.destructing ? null : this.onopen()

			this.native = ws
		}

		send(data: Parameters<WebSocket['send']>[0]) { return this.native.send(data) }

		get readyState() { return this.native.readyState }

		onerror(error: Event) {}
		onclose(error: CloseEvent) {}
		onmessage(e: MessageEvent) {}
		onopen() {}

		override destructor() {
			if (this.destructing) return
			this.destructing = true

			this.native.close()
		}
	}

}
