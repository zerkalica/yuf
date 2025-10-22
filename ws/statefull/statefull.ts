namespace $ {
	type Value = string | number | boolean | null

	export type $yuf_ws_statefull_message = {
		// entity or list type
		type: string

		// Request id to route response to request promise
		// If null or undefined - first response with type+id+query resolves request promise
		req_id?: string | null

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
		@ $mol_memo.field
		static get _() { return new this() }

		@ $mol_mem
		session() { return this.$.$yuf_session._ }

		override is_ping(msg: { type?: string }) { return msg.type === 'ping' }
		override send_pong() { this.send_object({ type: 'pong' }) }
		override send_ping() { this.send_object({ type: 'ping' }) }

		send_auth(token: string) { this.send_object({ type: 'auth', data: { token } }) }

		@ $mol_mem
		override token_sended() {
			if (! this.opened() ) return null
			const token = this.session().token()
			this.error(null)
			if (! token ) return null
			this.send_auth(token)

			return token
		}

		message_signature({ type, query, device, id }: Partial<$yuf_ws_statefull_message>) {
			return { type, id, query, device }
		}

		code_to_error(error: string | number) {
			return '' + error
		}

		/**
		 * @throws if error field in message object is not empty
		 * @returns undefined - not recognized message, null - delete patch
		 */
		message(obj: Partial<$yuf_ws_statefull_message>) {
			if (Array.isArray(obj)) return null
			if ( ! ('type' in obj) && ! ( 'error' in obj) ) return null
			if ((obj as { error?: string | null }).error === null) return null

			const error = obj.error ? (this.code_to_error(obj.error) || obj.error) : null
			if (! error) return obj

			const signature = this.message_signature(obj)
			const message = `${obj.message ? `${obj.message} ` : ''} [${error}] ${JSON.stringify(signature)}`

			throw new $yuf_transport_error(message, {
				message: obj.message,
				req_id: obj.req_id,
				code: error,
				http_code: error === 'AUTH_FAILED' ? 403 : undefined,
				json: obj
			})
		}

		deadline_timeout() { return 20000 }

		@ $mol_mem_key
		protected channel<Val>(signature: {}) {
			return new this.$.$yuf_ws_statefull_channel<Val>(this, signature)
		}

		data<Val>(signature: {}, data?: null | Val, refresh?: 'refresh') {
			return this.channel<Val>(signature).data(data, refresh)
		}

		protected override on_object( obj: {} ) {
			const signature = this.message_signature(obj)
			const channel = signature.type ? $mol_wire_probe(() => this.channel(signature)) : null

			try {
				const message = this.message(obj)
				if (message) channel?.receive(message)
			} catch (error) {
				if (this.auth_need(error as {})) {
					$mol_wire_async(this.session()).logout().catch(e => this.$.$mol_fail_log(e))
				}
				if ( ! channel ) $mol_fail_hidden(error)

				const req_id = error instanceof $yuf_transport_error ? error.req_id() : null
				channel.receive({ data: error, req_id })
			}
		}

		auth_need(error: { cause?: { http_code?: number } }) {
			return error.cause?.http_code === 403
		}

	}

}
