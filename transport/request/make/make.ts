namespace $ {
	export type $yuf_transport_request_make_params =  Omit<RequestInit, 'headers'> & {
		deadline?: number | null
		client_id?: string
		headers?: [string, string][] | Headers | $yuf_header_rec
		auth_token?: string | null | undefined // null - auth disabled
	}

	export function $yuf_transport_request_make(this: $, path: RequestInfo, init?: $yuf_transport_request_make_params) {
		const headers_base = $yuf_header_normalize(init?.headers)

		let content_type = headers_base.get('Content-Type')

		if (content_type === null) {
			if (init?.body instanceof URLSearchParams) content_type = 'application/x-www-form-urlencoded'
			if ( typeof init?.body === 'string' ) content_type = 'application/json'
		}

		const id = $mol_guid()

		const headers = $yuf_header_merge(headers_base, {
			'Authorization': init?.auth_token ? `Bearer ${init?.auth_token}` : init?.auth_token,
			'X-Request-ID': id,
			'X-Request-Deadline': typeof init?.deadline === 'number' ? `${init?.deadline.toFixed(0)}ms` : init?.deadline,
			'X-Client-ID': init?.client_id,
			'Content-Type': [content_type],
		})

		let url = typeof path === 'string' ? path : path.url
		const prev = typeof path === 'string' ? url : new Request(url, path)

		const req = new Request(prev, { ...init, headers })
		if (req.body && init?.body) {
			$yuf_pojo_known.set(req, init)
		}
		return req
	}

}
