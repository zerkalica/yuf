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

				return { ... obj, data }
			} catch (e) {

				if (e instanceof Error) {
					const cause = e.cause instanceof $yuf_error_cause ? e.cause : null
					const code = cause?.code ?? 'INTERNAL_ERROR'

					const res = {
						... obj,
						error: code,
						message: e.message ?? ''
					}

					return res
				}

				$mol_fail_hidden(e)
			}
		}

		override message_normalize({ type, query, device, id }: Partial<$yuf_ws_statefull_message>) {
			return { type, id, query, device }
		}
	}
}
