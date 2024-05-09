namespace $ {
	export class $yuf_ws_error extends Error {
		name = '$yuf_ws_error'
		cause: Event | undefined

		constructor(cause: Event) {
			const readyStateText = $yuf_ws_error.ready_state_info[(cause.target as WebSocket).readyState] ?? 'unknown'
			const codeText = $yuf_ws_error.error_info(cause)

			super(
				`${readyStateText} ${codeText}`,
				{ cause }
			)

			this.cause = cause
		}

		static message(cause: Event) {
			const readyStateText = $yuf_ws_error.ready_state_info[(cause.target as WebSocket).readyState] ?? 'unknown'
			const codeText = $yuf_ws_error.error_info(cause)

			return `${readyStateText} ${codeText}`
		}

		static ready_state_info: Record<number, string> = {
			0: 'connecting',
			1: 'open',
			2: 'closing',
			3: 'closed',
			// [WebSocket.CONNECTING]: 'connecting',
			// [WebSocket.OPEN]: 'open',
			// [WebSocket.CLOSING]: 'closing',
			// [WebSocket.CLOSED]: 'closed',
		}
	
		static error_info(e: Event & Partial<CloseEvent & ErrorEvent>) {
			return [
				e.wasClean ? 'clean' : 'dirty',
				e.code,
				e.code ? this.code_description(e.code) : undefined,
				e.reason,
				e.message,
				e.error
			].filter(Boolean).join(', ')
		}

		// https://github.com/Luka967/websocket-close-codes
		static ws_code_titles: Record<number, string | undefined> = {
			1000: 'CLOSE_NORMAL',
			1001: 'CLOSE_GOING_AWAY',
			1002: 'CLOSE_PROTOCOL_ERROR',
			1003: 'CLOSE_UNSUPPORTED',
			1005: 'CLOSED_NO_STATUS',
			1006: 'CLOSE_ABNORMAL',
			1007: 'Unsupported payload',
			1008: 'Policy violation',
			1009: 'CLOSE_TOO_LARGE',
			1010: 'Mandatory extension',
			1011: 'Server error',
			1012: 'Service restart',
			1013: 'Try again later',
			1014: 'Bad gateway',
			1015: 'TLS handshake fail',
		}

		static code_description(code: number) {
			let title = this.ws_code_titles[code]
			if (title) return title
			if (code >= 4000) return 'Application error'
			if (code >= 3000) return 'IANA error'
			if (code >= 2000) return 'websocket extension error'

			return 'unknown'
		}
	}
}
