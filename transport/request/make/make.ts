namespace $ {
	export type $yuf_transport_request_make_params =  Omit<RequestInit, 'headers'> & {
		deadline?: number
		client_id?: string
		headers?: [string, string][] | Headers | $yuf_header_rec
		auth_token?: string | null // null - auth disabled
	}

	export function $yuf_transport_request_make(this: $, path: RequestInfo, init?: $yuf_transport_request_make_params) {
		const headers_base = $yuf_header_normalize(init?.headers)

		let content_type = headers_base.get('Content-Type')

		if (content_type === undefined) {
			if (init?.body instanceof URLSearchParams) content_type = 'application/x-www-form-urlencoded'
			if ( typeof init?.body === 'string' ) content_type = 'application/json'
		}

		const id = $mol_guid()

		const headers = $yuf_header_merge(headers_base, {
			'Authorization': init?.auth_token ? `Bearer ${init?.auth_token}` : null,
			'X-Request-ID': id,
			'X-Request-Deadline': init?.deadline ? `${init?.deadline.toFixed(0)}ms` : null,
			'X-Client-ID': init?.client_id,
			'Content-Type': content_type,
		})

		let url = typeof path === 'string' ? path : path.url
		const prev = typeof path === 'string' ? url : new Request(url, path)

		return new Request(prev, { ...init, headers })
	}

}
