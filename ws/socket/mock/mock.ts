namespace $ {
	export class $yuf_ws_socket_mock<Message = unknown> extends $yuf_ws_socket {
		open_timeout() { return 1000 }

		answer_timeout() { return 500 }

		periodically_timeout() { return 5000 }
		close_on_every_tick() { return 100_000 }

		override native() {
			if (this._native) return this._native

			const native = {
				readyState: WebSocket.CONNECTING as number,
				close: (code = 1000) => {
					native.readyState = WebSocket.CLOSING
					this.periodically_timer?.destructor()
					new this.$.$mol_after_timeout(this.open_timeout(), () => {
						native.readyState = WebSocket.CLOSED
						this.onclose({ type: code > 1000 ? 'error' : 'close' } as CloseEvent)
					})
				}
			}

			this._native = native as WebSocket

			new this.$.$mol_after_timeout(this.open_timeout(), () => {
				native.readyState = WebSocket.OPEN

				this.$.$mol_log3_rise({
					place: `${this.factory()}.native()`,
					message: 'opened'
				})
				this.onopen()
				this.periodically_schedule()
			})

			return this._native
		}

		protected periodically_timer = null as null | $mol_after_timeout
		protected periodically_schedule() {
			this.periodically_timer = new this.$.$mol_after_timeout(
				this.periodically_timeout(),
				() => this.periodically()
			)
		}

		protected periodically_tick = 0

		protected periodically() {
			const tick = this.close_on_every_tick()
			if (((++this.periodically_tick) % tick) === 0) {
				this.native().close(1006)
				return
			}

			if (this.native().readyState !== WebSocket.OPEN) return

			for (const sub of this.subs) {
				const answer = this.answer(sub, true)
				if (! answer) continue
				if (! sub ) continue
				Object.assign(sub, answer)

				this.onmessage({
					data: JSON.stringify(answer),
				} as MessageEvent)

			}

			this.periodically_schedule()
		}

		override destructor() {
			this.subs = []
			this.periodically_timer?.destructor()
			super.destructor()
		}

		answer(obj: Message, periodically = false): null | Message {
			return null
		}

		protected subs = [] as Message[]

		message_equal(a: Message, b: Message) {
			return $mol_compare_deep(this.message_normalize(a), this.message_normalize(b))
		}

		message_normalize(msg: Partial<Message>) {
			return msg
		}

		override send(raw: Parameters<WebSocket['send']>[0]) {
			const obj = JSON.parse(raw.toString()) as Message

			this.$.$mol_log3_come({
				place: `${this.factory()}.send()`,
				message: 'req',
				data: obj
			})

			const message = this.answer(obj)

			this.subs = this.subs.filter(sub => ! this.message_equal(obj, sub) )

			if (! message) return

			this.subs.push(message)

			new this.$.$mol_after_timeout(this.answer_timeout(), () => this.receive(
				message
				// { ...message, data: obj.data? undefined : message.data }
			))
		}

		factory() { return this.constructor as typeof $yuf_ws_socket_mock }

		receive(message: unknown) {
			if (message === undefined) return
			if (this.native().readyState !== WebSocket.OPEN) return
			this.$.$mol_log3_done({
				place: `${this.factory()}.answer_receive()`,
				message: 'answer',
				data: message,
			})

			this.onmessage({
				data: JSON.stringify(message),
			} as MessageEvent)

		}


	}
}
