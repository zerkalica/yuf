namespace $ {
	export class $yuf_ws<Send = Object> extends $mol_object {

		watchdog_deadline() {
			return 30000
		}

		restart_delay() {
			return 2000
		}

		ping_interval() {
			return 3000
		}

		url() {
			return ''
		}

		sleeping_default() { return false }

		@ $mol_mem
		sleeping(next?: null) {
			const actual = this.$.$yuf_browser_live.hidden()
			const hidden = actual || this.sleeping_default()

			if (next === undefined) {
				this.$.$mol_log3_rise({
					place: '$yuf_ws.hidden()',
					socket_id: this.id(),
					message: hidden ? 'hidden' : 'visible',
				})
			}

			if (hidden) {
				if (! this.closed_at) this.closed_at = new Date()
			}

			return hidden
		}

		id() {
			return $mol_wire_probe(() => this.ws())?.socket_id
		}

		protected id_create() {
			return $mol_guid()
		}

		restart(reason = 'User') {
			this.ws(reason)
		}

		@ $mol_mem
		protected ws(reason?: string) {
			this.sleeping()
			if (reason) {
				this.$.$mol_log3_rise({
					place: '$yuf_ws.ws()',
					socket_id: this.id(),
					message: `restart by ${reason}`,
				})
			}
			const socket_id = this.id_create()
			let destructing = false

			let ws
			let url

			try {
				ws = new WebSocket( url = this.url() )
			} catch (e) {
				if ($mol_promise_like(e) || e instanceof $mol_error_mix) $mol_fail_hidden(e)
				$mol_fail_hidden($mol_wire_sync($mol_error_mix).make(
					'Не могу создать сокет ',
					{
						url,
						socket_id,
						reason
					},
					e as Error
				))
			}

			const socket = Object.assign(
				ws,
				{
					socket_id,
					destructor: () => {
						if (destructing) return
						destructing = true
						this.$.$mol_log3_rise({
							place: '$yuf_ws.ws()#destructor',
							socket_id: socket_id,
							message: 'destruct',
						})
						socket.close()
					}
				}
			)

			socket.onerror = socket.onclose = $mol_wire_async(
				(e: Event | CloseEvent) => destructing || this.on_close(e)
			)
			socket.onmessage = $mol_wire_async((message: MessageEvent) => this.on_message(message))
			socket.onopen = $mol_wire_async(() => this.on_open())

			this.$.$mol_log3_rise({
				place: '$yuf_ws.ws()',
				socket_id: socket_id,
				message: 'init',
			})
			this.error_last(null)

			return socket
		}

		protected sends = [] as (string | ArrayBufferLike | Blob | ArrayBufferView)[]

		protected on_open() {
			this.error_last(null)
			this.sleeping(null)
			this.sends_flush()
		}

		protected sends_flush() {
			const ws = this.ws()
			while (ws.readyState === WebSocket.OPEN && this.sends.length) {
				const blob = this.sends[0]
				ws.send(blob)
				this.sends.shift()
			}
		}

		@ $mol_action
		send(data: Parameters<ReturnType<typeof this.ws>['send']>[0], skip_closed = false) {
			const ws = this.ws()

			if (ws.readyState === WebSocket.OPEN) ws.send(data)
			else if (! skip_closed) this.sends.push(data)
		}

		send_object(data: Send) {
			return this.send(JSON.stringify(data))
		}

		@ $mol_mem
		static ping_off(next?: boolean | null) {
			return Boolean(this.$.$mol_state_arg.value(
				'yuf_ws_ping_off',
				next === undefined ? undefined : (next ? '' : null)
			))
		}

		protected closed_at = undefined as undefined | Date

		@ $mol_action
		replay_from(from_date: Date) {}

		@ $mol_mem
		protected ping_off() {
			return this.$.$yuf_ws.ping_off()
		}

		on_message(e: MessageEvent) {
			const task = e.data
			try {
				this.on_data(task)
			} catch (e) {
				if( $mol_promise_like( e ) ) $mol_fail_hidden( e )
				const val = $mol_wire_sync($mol_error_mix).make('Can\'t parse message', { task }, e as Error)
				this.errors_push(val)
			}
		}

		on_data(data: unknown) {
			this.on_object(typeof data === 'string' ? JSON.parse(data) : undefined)
		}

		on_object(e: Object) {}

		restartable(event: Event & { code?: number }) {
			return event.type === 'close' && event.code !== 1000
		}

		protected on_close(event: Event) {
			if (! this.closed_at) this.closed_at = new Date()

			const prev = this.error_last()
			const prev_event = prev instanceof $yuf_ws_error ? prev.cause : undefined

			const delay = this.restart_delay()
			const restartable = delay && (! prev_event || this.restartable(prev_event)) && this.restartable(event)
			const err = new $yuf_ws_error(event)

			this.$.$mol_log3_rise({
				place: '$yuf_ws.on_close()',
				socket_id: this.id(),
				message: err?.cause?.type === 'error' ? 'error' : 'close',
				restartable: restartable ? 'connecting' : 'sleep',
			})

			this.errors_push(err)

			if (restartable) this.watchdog('event ' + ( event.type || 'unknown' ), delay)
		}

		@ $mol_action
		ping_send() {
			const buf = new Uint8Array([ 0x9 ])
			this.send(buf)
		}

		@ $mol_mem
		protected heartbeat(next?: null): $mol_after_timeout | undefined {
			if (! this.ping_interval() || this.ping_off() || this.sleeping()) return
			this.ws()
			this.ping_send()

			return new this.$.$mol_after_timeout(
				this.ping_interval(),
				$mol_wire_async(() => this.heartbeat(null))
			)
		}

		@ $mol_mem
		protected watchdog(reason?: null | string, timeout = this.watchdog_deadline()) {
			if (! timeout || this.ping_off() || this.sleeping()) return

			this.ws()

			return Object.assign(new this.$.$mol_after_timeout(
				timeout,
				$mol_wire_async(() => this.ws(reason ?? 'watchdog timeout'))
			), { reason })
		}

		@ $mol_mem
		errors(next?: readonly Error[]) {
			return next ?? []
		}

		@ $mol_action
		protected errors_push(error: Error) {
			this.$.$mol_fail_log(error)
			this.errors([ ...this.errors(), error ])
		}

		error_last(reset?: null) {
			if (reset === null) this.errors([])
			return this.errors().at(-1)
		}

		init() {}

		@ $mol_mem
		protected init_once() {
			this.ws()
			this.init()
		}

		restart_reason() {
			return this.watchdog()?.reason
		}

		@ $mol_mem
		status(): 'error' | 'open' | 'connecting' | 'sleep' {
			if (this.sleeping()) return 'sleep'

			let state: number = WebSocket.CONNECTING

			try {
				state = this.ws().readyState
			} catch (e) {
				this.$.$mol_fail_log(e)
				if (e instanceof Error) {
					this.errors_push(e)
					return 'error'
				}
				return 'connecting'
			}

			if (state === WebSocket.OPEN) this.init_once()
			this.heartbeat()
			const reason = this.watchdog()?.reason

			if (this.closed_at) {
				this.replay_from(this.closed_at)

				this.$.$mol_log3_rise({
					place: '$yuf_ws.status()',
					socket_id: this.id(),
					message: 'replay from',
					closed_at: this.closed_at.toISOString(),
				})
				this.closed_at = undefined
			}

			if (this.errors().length) return 'error'
			if (reason) return 'connecting'
			if (state === WebSocket.CONNECTING) return 'connecting'
			if (state === WebSocket.CLOSING) return 'sleep'
			if (state === WebSocket.CLOSED) return 'sleep'

			return 'open'
		}

	}
}
