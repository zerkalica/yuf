namespace $ {
	export class $yuf_ws_statefull_channel<Val = unknown> extends $mol_object {
		constructor(
			protected host: {
				ready(): boolean
				send_object(message: {}): void
				deadline_timeout(): number
			},
			readonly signature: { },
		) {
			super()
		}

		ready() { return this.host.ready() }

		send_data(data?: Val | null, req_id?: string, op?: 'unsubscribe') {
			this.host.send_object({
				...this.signature,
				data,
				req_id,
				error: op === 'unsubscribe' ? null : undefined,
			})
		}

		deadline_timeout() { return this.host.deadline_timeout() }

		protected response = null as null | $yuf_promise<Val | null>

		protected subscribed = false
		receive(message: { data?: unknown, req_id?: string | null }) {
			const data = message.data === undefined ? {} : message.data

			if (this.response && (! message.req_id || this.response.id === message.req_id)) {
				return this.response.value(data as Val)
			}

			try {
				this.data(data as Val, 'cache')
			} catch (err) {
				// Error from socket pushed to mem causes exception, ignore it
				if (err !== data) $mol_fail_hidden(err)
			}
		}

		@ $mol_mem
		data(next?: Val | null, cache?: 'cache'): Val | null {
			if (next !== undefined && cache) return next
			const prev = $mol_wire_probe(() => this.data())

			if (! this.response && ( next !== undefined || prev === undefined ) ) {
				this.response = new $yuf_promise<Val | null>()
				this.response.deadline(
					this.deadline_timeout(),
					new $yuf_transport_error_timeout({input: JSON.stringify(this.signature) }),
				)
			}

			// Resend subscription on auth token or ws connection change
			if (this.ready()) {
				this.send_data(next, this.response?.id)
				if (next === undefined) this.subscribed = true
			}

			const value = this.response ? this.response.value() : ( prev ?? null )
			this.response = null

			if (value instanceof Error) $mol_fail_hidden(value)

			return value as Val | null
		}

		override destructor() {
			if (! this.subscribed) return

			try {
				this.send_data(null, undefined, 'unsubscribe')
			} catch (e) {
				$mol_fail_log(e)
			}
		}

	}
}
