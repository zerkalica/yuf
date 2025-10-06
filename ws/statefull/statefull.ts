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
		@ $mol_memo.field
		static get _() { return new this() }

		token(next?: string | null) { return this.$.$yuf_transport.token(next) }
		logged() { return Boolean(this.token()) }
		logout() { this.token(null) }

		override is_ping(msg: { type?: string }) { return msg.type === 'ping' }
		override send_pong() { this.send_object({ type: 'pong' }) }
		override send_ping() { this.send_object({ type: 'ping' }) }

		@ $mol_mem
		override token_sended() {
			const token = this.opened() ? this.token() : null
			token && this.send_data({ type: 'auth' }, { token })
			return token
		}

		send_data(signature: {}, data?: {} | null, op?: 'unsubscribe') {
			this.send_object({ ... signature, data, error: op === 'unsubscribe' ? null : undefined })
		}

		message_signature({ type, query, device, id }: Partial<$yuf_ws_statefull_message>) {
			return { type, id, query, device }
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

			let message = `${obj.message ? `${obj.message} ` : ''}[${obj.error}]`

			if (obj.type) message += '/' + obj.type
			if (obj.id) message += '/' + obj.id
			if (obj.device?.length) message += `/device/${obj.device.join('~')}`

			if (obj.query) message += '?' + new URLSearchParams(
				Object.entries(obj.query as Record<string, string>)
			).toString()

			throw new $yuf_transport_error(message, {
				message: obj.message,
				code: obj.error,
				http_code: obj.error === 'AUTH_FAILED' ? 403 : undefined,
				json: obj
			})
		}

		deadline_timeout() { return 20000 }

		@ $mol_mem_key
		channel<Val>(signature: {}) {
			return new this.$.$yuf_ws_statefull_channel<Val>(this, signature)
		}

		protected override on_object( obj: {} ) {
			const signature = this.message_signature(obj)
			const channel = signature.type ? $mol_wire_probe(() => this.channel(signature)) : null

			try {
				const data = this.message_data(obj)
				if (data !== undefined) channel?.receive(data)
			} catch (error) {
				if (this.auth_need(error as {})) this.logout()
				if ( ! channel ) $mol_fail_hidden(error)
				channel.receive(error as {})
			}
		}

		auth_need(error: { cause?: { http_code?: number } }) {
			return error.cause?.http_code === 403
		}

	}

}
