namespace $ {
	export class $yuf_ws_host_statefull extends $yuf_ws_host {
		token(next?: string | null) { return this.$.$yuf_transport.token(next) }

		@ $mol_mem
		authorized() {
			if (! this.ready()) return false
			const token = this.token()
			if (! token) return false
			this.send_auth(token)
			return true
		}

		logged() { return Boolean(this.token()) }
		logout() { this.token(null) }

		send_pong() {}
		send_auth(token: string) {}
		send_unsubscribe(signature: {}) {}
		is_subscription(message: {}) { return false }
		is_ping(msg: {}) { return false }
		is_pong(msg: {}) { return false }

		protected registered = {} as Record<string, ($yuf_entity2 | null)[] | null>
		protected subscribed = {} as Record<string, boolean | null>

		@ $mol_mem
		subs_all(reset?: null) {
			return Object.values(this.registered)
		}

		message_key(message: {}) {
			return JSON.stringify({ ...message, data: undefined })
		}

		sub_add(signature: {}, sub: $yuf_entity2) {
			const key = this.message_key(signature)

			const registered = this.registered

			registered[key] = registered[key] ?? []
			const index = registered[key].length
			registered[key].push(sub)
			this.subs_all(null)

			return { destructor: () => this.sub_remove(signature, index) }
		}

		protected sub_remove(signature: {}, index: number) {
			const registered = this.registered

			const key = this.message_key(signature)

			if (! registered[key]?.[index]) return

			registered[key][index] = null
			this.subs_all(null)

			if (! registered[key].some(Boolean)) delete registered[key]

			if ( ! this.subscribed[key] ) return
			delete this.subscribed[key]

			try {
				// unsubscribe on umount or on signature changes
				this.send_unsubscribe(signature)
			} catch (e) {
				$mol_fail_log(e)
				// ignore errors
			}
		}

		override send_object( message: {} ) {
			super.send_object(message)

			if (! this.is_subscription(message)) return

			this.subscribed[this.message_key(message)] = true
		}

		protected override on_object( obj: {} ) {
			this.log_raw_add(obj)

			let data, subs

			try {
				subs = this.registered[this.message_key(obj)]
				data = this.message_data(obj)
				if (data === undefined) return

				if (this.is_ping(obj)) return this.send_pong()
				if (this.is_pong(obj)) return this.watchdog(null)
			} catch (error) {
				if (this.auth_need(error as {})) this.logout()
				if (! subs?.some(Boolean) ) $mol_fail_hidden(error)
				data = error as {}
			}

			let push_error

			for (const sub of subs ?? []) {
				try {
					sub?.actual(data, 'cache')
				} catch (err) {
					// Error from socket pushed to mem causes exception, ignore it
					if (err !== data) push_error = err
				}
			}

			if (push_error) $mol_fail_hidden(push_error)
		}

		auth_need(error: { cause?: { http_code?: number } }) {
			return error.cause?.http_code === 403
		}

		/**
		 * Throws error if error field in message is not empty
		 * @returns undefined - not recognized message, null - delete patch
		 */
		message_data(obj: {}): {} | null | undefined {
			throw new Error('Implement')
		}

		protected messages = [] as {}[]

		@ $mol_mem
		protected last_message_at(reset?: null) { return Date.now() }

		protected log_raw_add(message: {}) {
			if ( ! $mol_wire_probe(() => this.messages_grab()) ) return
			this.messages.push(message)
			this.last_message_at(null)
		}

		@ $mol_mem
		messages_grab() {
			this.last_message_at()
			const messages = this.messages
			this.messages = []
			return messages
		}

		@ $mol_mem
		override syncing() {
			let overall

			const subs_all = this.subs_all()

			// need to pool pushing tasks in root app
			for (const subs of subs_all) {
				for (const sub of subs ?? []) {
					try {
						sub?.pushing()
					} catch (e) {
						if (e instanceof Error) overall = e
						else if ( ! (overall instanceof Error) ) overall = e
					}
				}
			}

			return $mol_promise_like(overall)
		}
	}

}
