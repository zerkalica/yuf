namespace $ {
	type Value = string | number | boolean | null

	export type $yuf_ws_statefull_message = {
		// entity or list type
		type: string

		// entity id
		id?: string | number
		// list search params
		query?: Record<string, Value | readonly Value[]> | null

		// optional target server paths
		device?: readonly string[] | null

		// to server: undefined - get and subscribe, null - delete, object - replace
		// from server: null - deleted, object - new data
		data?: unknown

		// Error enum, null - unsubscribe
		error?: string | null

		// Optional error message
		message?: string | null
	}

	export class $yuf_ws_statefull extends $yuf_ws_host {
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

		send_auth(token: string) { this.send_object({ type: 'auth', data: { token } }) }
		send_pong() { this.send_object({ type: 'pong' }) }
		send_ping() { this.send_object({ type: 'ping' }) }
		send_unsubscribe(signature: { type?: string }) {
			signature.type && this.send_object({ ... signature, error: null, data: null })
		}

		is_subscription(message: { data?: unknown }) { return message.data === undefined }
		is_ping(msg: { type?: string }) { return msg.type === 'ping' }
		is_pong(msg: { type?: string }) { return msg.type === 'pong' }

		message_key({ type, query, device, id }: Partial<$yuf_ws_statefull_message>) {
			let url_query = ''

			if (query) {
				const params = new URLSearchParams()

				for (const key of Object.keys(query)) {
					const item = query[key]
					for (const sub of Array.isArray(item) ? item : [ item ] ) {
						params.append(key, sub)
					}
				}

				url_query = params.toString()
			}

			const t = type?.startsWith('/') ? type.slice(1) : type

			return `${device?.length ? `/device/${device.join('~')}` : ''
				}${t ? `/${t}` :''
				}${id ? `/${id}` :''
				}${url_query ? `?${url_query}` : ''
				}`
		}

		/**
		 * @throws if error field in message object is not empty
		 * @returns undefined - not recognized message, null - delete patch
		 */
		message_data(obj: Partial<$yuf_ws_statefull_message>) {
			if (Array.isArray(obj)) return undefined
			if ( ! ('type' in obj) && ! ( 'error' in obj) ) return undefined
			if ((obj as { error?: string | null }).error === null) return undefined

			if (! obj.error) return obj.data === undefined ? {} : obj.data

			let message = obj.message ?? ''

			if (obj.error) message += `${message ? ' ' : ''}[${obj.error}]`
			if (obj.type) message += `${message ? ' ' : ''}/${obj.type}/`

			if (! message) message = JSON.stringify(obj) || 'Unknown'

			throw new $yuf_transport_error(message, {
				message: obj.message,
				code: obj.error,
				http_code: obj.error === 'AUTH_FAILED' ? 403 : undefined,
				json: obj
			})
		}

		protected registered = {} as Record<string, ($yuf_entity2 | null)[] | null>
		protected subscribed = {} as Record<string, boolean | null>

		@ $mol_mem
		subs_all(reset?: null) {
			return Object.values(this.registered)
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

		deadline_timeout() { return 20000 }

		protected request_promises = {} as Record<string, $yuf_entity2_promise<unknown> | null>

		request({ signature, body_object, need_auth, deadline }: {
			signature: {}
			body_object: undefined | {} | null
			need_auth?: boolean
			deadline?: number
		}) {
			const request_promises = this.request_promises
			const key = this.message_key(signature)

			// Resend on auth token or ws connection change
			const ready = need_auth ? this.authorized() : this.ready()
			if (ready) this.send_object({ ... signature, data: body_object })

			request_promises[key] = request_promises[key] ?? new $yuf_entity2_promise<unknown>(
				undefined,
				deadline ?? this.deadline_timeout(),
				new $yuf_transport_error_timeout({ input: key })
			)

			const value = request_promises[key].value as NonNullable<typeof body_object> | Error | undefined | null
			if (value === undefined) $mol_fail_hidden(request_promises[key])
			delete request_promises[key]

			if (value instanceof Error) $mol_fail_hidden(value)

			return value
		}

		protected override on_object( obj: {} ) {
			this.log_raw_add(obj)

			let data, key

			try {
				key = this.message_key(obj)
				data = this.message_data(obj)
				if (data === undefined) return

				if (this.is_ping(obj)) return this.send_pong()
				if (this.is_pong(obj)) return this.watchdog(null)
			} catch (error) {
				if (this.auth_need(error as {})) this.logout()
				if (! key || ! this.registered[key]?.some(Boolean) ) $mol_fail_hidden(error)
				data = error as {}
			}

			const promise = this.request_promises[key]

			if (promise) return promise.set(data)

			let push_error

			for (const sub of this.registered[key] ?? []) {
				try {
					sub?.data(data, 'cache')
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
