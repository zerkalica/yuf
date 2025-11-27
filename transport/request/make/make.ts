namespace $ {
	export type $yuf_transport_request_make_params =  Omit<RequestInit, 'headers'> & {
		deadline?: number
		headers?: [string, string][] | Headers | $yuf_header_rec
		auth_token?: string | null // null - auth disabled
	}

	export function $yuf_transport_request_make(this:$, path: RequestInfo, init?: $yuf_transport_request_make_params) {
		const session = this.$.$mol_one.$yuf_session
		const client_id = session.client_id()
		let token = init?.auth_token
		if (token === 'new') token = session.token(null, 'refresh')
		if (token === undefined) token = session.token()

		const deadline = init?.deadline
		const body = init?.body
		const headers_base = $yuf_header_normalize(init?.headers)

		let content_type = headers_base.get('Content-Type')

		if (content_type === undefined) {
			if (body instanceof URLSearchParams) content_type = 'application/x-www-form-urlencoded'
			if ( typeof body === 'string' ) content_type = 'application/json'
		}

		const id = $mol_guid()

		const headers = $yuf_header_merge(headers_base, {
			'Authorization': token ? `Bearer ${token}` : null,
			'X-Request-ID': id,
			'X-Request-Deadline': deadline ? `${deadline.toFixed(0)}ms` : null,
			'X-Client-ID': client_id,
			'Content-Type': content_type,
		})

		let url = typeof path === 'string' ? path : path.url
		const prev = typeof path === 'string' ? url : new Request(url, path)

		return new Request(prev, { ...init, headers })
	}

}
