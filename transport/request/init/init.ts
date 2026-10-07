namespace $ {
	export type $yuf_transport_request_init = Omit<RequestInit, 'headers'> & {
		headers?: [string, string][] | Headers | $yuf_header_rec | null
	} & $yuf_header_std_rec

	export function $yuf_transport_request_init_merge(
		base?: $yuf_transport_request_init,
		extra?: $yuf_transport_request_init
	): RequestInit {
		const body = extra?.body ?? base?.body
		const detected_method = body ? 'POST' : 'GET'
		const detected_type = $yuf_header_content_type_from_body(body)

		const method = extra?.method ?? base?.method ?? detected_method

		const base_headers = $yuf_header_normalize(base?.headers)
		const headers = ! extra?.headers ? base_headers : $yuf_header_merge(base_headers, extra.headers)

		if (detected_type && ! headers.has('Content-Type')) headers.set('Content-Type', detected_type)

		return { ...base, ...extra, method, headers }
	}
}

