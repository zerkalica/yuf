namespace $ {
	// https://github.com/Luka967/websocket-close-codes
	export const $yuf_ws_code = {
		1000: 'Normal closure',
		1001: 'Going away',
		1002: 'Protocol error',
		1003: 'Unsupported data',
		1005: 'No status rcvd',
		1006: 'Abnormal closure',
		1007: 'Unsupported invalid frame payload data',
		1008: 'Policy violation',
		1009: 'Message too big',
		1010: 'Mandatory extension',
		1011: 'Internal error',
		1012: 'Service restart',
		1013: 'Try again later',
		1014: 'Bad gateway',
		1015: 'TLS handshake',
		3000: 'Unauthorized',
		3003: 'Forbidden',
		3008: 'Timeout',
		4000: 'Application error',
	} as const

	export function $yuf_ws_code_text(code: number) {
		return $yuf_ws_code[code as keyof typeof $yuf_ws_code] || ($yuf_ws_code[4000] + ' ' + code)
	}

}
