namespace $ {
	export class $yuf_ws_statefull_socket_mock extends $yuf_ws_socket_mock<$yuf_ws_statefull_message> {
		message_sub(obj: $yuf_ws_statefull_message) {
			return this.$.$yuf_entity2.active_model(this.message_normalize(obj))
		}

		override answer(obj: $yuf_ws_statefull_message, periodically = false) {
			if (obj.type === 'ping') return { type: 'pong' }

			if (obj.error === null) return null // unsubscribe

			try {
				const first = this.message_sub(obj)

				if (! first) return null

				if (periodically && ! first.mock_periodically() ) return null

				const data = first.mock(obj.data as {}) ?? null

				if (data === null) return data

				return { ... obj, data, error: undefined, message: undefined }
			} catch (e) {

				if (e instanceof Error) {
					const error = e.message || 'INTERNAL_ERROR'

					const message = e.cause
						&& typeof e.cause === 'object'
						&& 'message' in e.cause
						&& typeof e.cause.message === 'string'
							? e.cause.message
							: ''

					return { ... obj, error, message, data: undefined }
				}

				$mol_fail_hidden(e)
			}
		}

		override message_normalize({ type, query, device, id }: $yuf_ws_statefull_message) {
			return { type, id, query, device }
		}
	}
}
