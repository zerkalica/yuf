namespace $ {
	export class $yuf_ws_host extends $mol_object {

		@ $mol_memo.field
		static get _() { return new this() }

		watchdog_deadline() { return 30000 }
		restart_delay() { return 3000 }
		ping_interval() { return 3000 }
		url() { return '' }

		enabled() { return true }

		id() { return $mol_wire_probe(() => this.ws())?.id ?? null }

		protocols() { return [] as string[] }

		restarts() {}

		@ $mol_mem
		protected ws(reset?: null) {
			this.restarts()
			if (! this.enabled()) return null

			return this.$.$yuf_ws_socket.make({
				url: () => this.url(),
				protocols: () => this.protocols(),
				onclose: e => this.on_close(e),
				onerror: e => this.on_error(e),
				onopen: () => this.on_open(),
				onmessage: e => this.on_message(e),
			})
		}

		restartable(event: Event & { code?: number }) {
			return event.type === 'error' || (event.type === 'close' && event.code !== 1000)
		}

		protected on_error(event: Event) {
			const err = new this.$.$yuf_ws_error(event)
			this.opened(null)
			this.error(err)
		}

		protected on_close(event: CloseEvent) {
			const delay = this.restart_delay()
			const restartable = delay && event && this.restartable(event)
			this.$.$mol_log3_rise({
				place: '$yuf_ws_host.on_close()',
				socket_id: this.id(),
				message: new this.$.$yuf_ws_error(event).message,
				hint: restartable ? `reconnecting after ${delay} ms` : 'sleep',
			})

			this.opened(null)

			if (restartable) this.watchdog(null, delay)
		}

		protected on_open() {
			this.opened(null)
			this.error(null)
		}

		protected on_message(event: MessageEvent) {
			const task = event.data

			try {
				this.on_data(task)
			} catch (err) {
				if( $mol_promise_like( err ) ) $mol_fail_hidden( err )
				$mol_fail_log(err)
				this.error(err as Error)
			}
		}

		@ $mol_action
		send(data: Parameters<WebSocket['send']>[0]) {
			const ws = this.ws()
			if (ws?.readyState !== WebSocket.OPEN) {
				throw new Error('Socket not opened', { cause: ws })
			}
			return ws.send(data)
		}

		send_object(data: {}) {
			return this.send(JSON.stringify(data))
		}

		is_ping(obj: {}) { return false }
		send_ping() {}
		send_pong() {}

		token_sended() { return null as null | string }

		protected on_data(data: unknown) {
			this.watchdog(null)
			const object = typeof data === 'string' ? JSON.parse(data) : null
			if (! object ) return

			if (this.is_ping(object)) return this.send_pong()

			this.message_add(object)
			this.on_object(object)
		}

		protected on_object(e: {}) {}

		protected debug_messages = [] as {}[]

		@ $mol_mem
		protected message_last_at(reset?: null) { return Date.now() }

		protected message_add(message: {}) {
			if ( ! $mol_wire_probe(() => this.messages_grab()) ) return
			this.debug_messages.push(message)
			this.message_last_at(null)
		}

		@ $mol_mem
		messages_grab() {
			this.message_last_at()
			const messages = this.debug_messages
			this.debug_messages = []
			return messages
		}

		@ $mol_mem
		protected opened(reset?: null) {
			return this.ws()?.readyState === WebSocket.OPEN
		}

		heatbeat_enabled() { return true }

		@ $mol_mem
		protected heartbeat() {
			const timeout = this.ping_interval()
			if (! this.heatbeat_enabled()) return null
			if (! timeout) return null
			if ( ! this.opened() ) return null

			this.send_ping()

			this.$.$mol_state_time.now( timeout )

			return null
		}

		watchdog_enabled() { return true }

		@ $mol_mem
		protected watchdog(reason?: null, timeout = this.watchdog_deadline()) {
			if (! timeout) return null

			// if watchdog disabled still reconnect if socket not opened
			if (! this.watchdog_enabled() && this.opened()) return null
			if (! this.ws()) return null

			return new this.$.$mol_after_timeout(timeout, () => this.ws(null))
		}

		@ $mol_mem
		error_packed(error?: null | [Error]) {
			this.restarts()
			return error ?? null
		}

		error(error?: null | Error) {
			return this.error_packed( error ? [ error ] : error )?.[0] ?? null
		}

		@ $mol_mem
		ready() {
			this.heartbeat()
			this.watchdog()
			this.token_sended()
			return this.opened()
		}

		syncing() { return false }

		@ $mol_mem
		error_message() {
			try {
				this.ready()
				this.syncing()
				return this.error()?.message ?? ''
			} catch (e) {
				if ( ! $mol_promise_like(e) ) return (e as Error).message ?? ''
			}

			return ''
		}

	}
}
