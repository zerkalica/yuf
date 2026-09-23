namespace $ {
	export type $yuf_transport_request_init = Omit<RequestInit, 'headers'> & $yuf_header_std_rec & {
		headers?: [string, string][] | Headers | $yuf_header_rec | null
	}

	export function $yuf_transport_request_init_enrich(init?: $yuf_transport_request_init): RequestInit {
		const headers_base = $yuf_header_normalize(init?.headers)
		const content_type = headers_base.get('Content-Type') ?? $yuf_header_content_type_from_body(init?.body)

		const headers = $yuf_header_merge(headers_base, $yuf_header_std_make({ ...init, content_type }))

		return { ...init, headers }
	}
}

