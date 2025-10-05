namespace $ {
	class Response_promise<Result> extends $mol_promise<Result> {
		value = undefined as undefined | Result | Error

		constructor(
			executor?: (
				done: (value: Result | PromiseLike<Result>) => void,
				fail: (reason?: any) => void
			) => void,
			timeout = 10_000,
			timeout_error = new Error('Timeout'),
			protected timer = new $mol_after_timeout(timeout, () => this.set(timeout_error)),
		) {
			super(executor)
		}


		set(next: Result | Error) {
			this.value = next
			this.timer.destructor()
			if (next instanceof Error) return this.fail(next)
			this.done(next)
		}
	}

	export class $yuf_ws_statefull_channel<Val = unknown> extends $mol_object {
		constructor(
			protected host: {
				send_data(signature: {}, data?: Val | null, op?: 'unsubscribe'): void
				deadline_timeout(): number
			},
			readonly signature: {},
		) {
			super()
		}

		send_data(data?: Val | null, op?: 'unsubscribe') { this.host.send_data(this.signature, data, op)}
		deadline_timeout() { return this.host.deadline_timeout() }

		protected response = null as null | Response_promise<unknown>

		receive(next: Val | null) {
			if (this.response) return this.response.set(next)

			try {
				this.data(next, 'cache')
			} catch (err) {
				// Error from socket pushed to mem causes exception, ignore it
				if (err !== next) $mol_fail_hidden(err)
			}
		}

		@ $mol_mem
		data(next?: Val | null, cache?: 'cache') {
			if (next !== undefined && cache) return next

			// Resend on auth token or ws connection change
			this.send_data(next)

			if (! this.response) {
				this.response = new Response_promise<unknown>(
					undefined,
					this.deadline_timeout(),
					new $yuf_transport_error_timeout({ input: JSON.stringify(this.signature) })
				)
			}

			const value = this.response.value as Val | null | Error

			if (value === undefined) $mol_fail_hidden(this.response)

			this.response = null

			if (value instanceof Error) $mol_fail_hidden(value)

			return value as Val | null
		}

		override destructor() {
			const prev = $mol_wire_probe(() => this.data())
			if (prev === undefined) return
			try {
				this.send_data(null, 'unsubscribe')
			} catch (e) {
				$mol_fail_log(e)
			}
		}

	}
}
