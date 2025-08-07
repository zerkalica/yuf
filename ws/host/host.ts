namespace $ {
	export class $yuf_ws_host<Send = Object> extends $mol_object {

		watchdog_deadline() { return 30000 }
		restart_delay() { return 5000 }
		ping_interval() { return 3000 }
		url() { return '' }

		enabled() { return true }

		id() { return $mol_wire_probe(() => this.ws())?.id ?? null }

		protocols() { return [] as string[] }

		@ $mol_mem
		restarts(reset?: null): number {
			let prev = $mol_wire_probe( () => this.restarts()) ?? 0
			if (reset === null) prev++
			return prev
		}

		@ $mol_mem
		protected ws() {
			this.restarts()

			if (! this.enabled()) return null

			try {
				const ws = new this.$.$yuf_ws_socket(this.url(), this.protocols())
				ws.onclose = e => this.on_close(e)
				ws.onerror = e => this.on_error(e)
				ws.onopen = () => this.on_open()
				ws.onmessage = e => this.on_message(e)

				return ws
			} catch (e) {
				if ($mol_promise_like(e)) $mol_fail_hidden(e)
				this.error(e as Error)
				return null
			}
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
			const err = new this.$.$yuf_ws_error(event)

			this.$.$mol_log3_rise({
				place: '$yuf_ws_host.on_close()',
				socket_id: this.id(),
				message: err.message,
				hint: restartable ? `reconnecting after ${delay} ms` : 'sleep',
			})

			this.opened(null)

			if (restartable) this.watchdog(null, delay)
		}

		protected on_open() { this.opened(null) }

		protected on_message(e: MessageEvent) {
			const task = e.data

			try {
				this.on_data(task)
			} catch (e) {
				if( $mol_promise_like( e ) ) $mol_fail_hidden( e )
				const val = new $mol_error_mix('Can\'t parse message ', { task }, e as Error)
				this.error(val)
			}
		}

		protected sends_flush(sends: Parameters<WebSocket['send']>[0][]) {
			const ws = this.ws()
			while (ws?.readyState === WebSocket.OPEN && sends.length) {
				const blob = sends[0]
				ws.send(blob)
				sends.shift()
			}

			return sends.length === 0
		}

		@ $mol_action
		send(data: Parameters<WebSocket['send']>[0]) {
			const ws = this.ws()
			if (ws?.readyState !== WebSocket.OPEN) {
				throw new Error('Socket not opened', { cause: ws })
			}
			return ws.send(data)
		}

		send_object(data: Send) { return this.send(JSON.stringify(data)) }

		protected on_data(data: unknown) {
			const object = typeof data === 'string' ? JSON.parse(data) : null
			if (object) this.on_object(object)
		}

		protected on_object(e: Object) {}

		@ $mol_action
		ping() {
			const buf = new Uint8Array([ 0x9 ])
			this.send(buf)
		}

		@ $mol_mem
		protected opened(reset?: null) { return this.ws()?.readyState === WebSocket.OPEN }

		heatbeat_enabled() { return true }

		@ $mol_mem
		protected heartbeat() {
			const timeout = this.ping_interval()
			if (! this.heatbeat_enabled()) return null
			if (! timeout) return null
			if ( ! this.opened() ) return null

			this.ping()

			this.$.$mol_state_time.now( timeout )

			return null
		}

		watchdog_enabled() { return true }

		@ $mol_mem
		protected watchdog(reason?: null, timeout = this.watchdog_deadline()) {
			if (! this.watchdog_enabled() ) return null
			if (! timeout) return null
			if (! this.ws()) return null

			return new this.$.$mol_after_timeout(timeout, () => this.restarts(null))
		}

		@ $mol_mem
		error(error?: null | Error) { return error ?? null }

		@ $mol_mem
		ready() {
			this.heartbeat()
			this.watchdog()
			return this.opened()
		}

	}
}
