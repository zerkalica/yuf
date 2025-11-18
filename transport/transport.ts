namespace $ {
	export type $yuf_transport_params =  RequestInit & {
		deadline?: number
		auth_token?: string | null // null - auth disabled
	}

	export class $yuf_transport extends $mol_fetch {

		// custom range headers
		static range(path: string, raw?: $yuf_transport_params & { count_prefer?: 'exact' | 'planned' }) {
			const { count_prefer, ...params } = raw ?? {}
			const res = this.request(path, {
				...params,
				method: 'HEAD',
				headers: $yuf_header_merge(params?.headers, {
					'Range-Unit': 'items',
					Prefer: `count=${count_prefer ?? 'exact'}`,
				}),
			}).success()

			const range_str = res.headers().get('Content-Range')

			return range_str ? $yuf_header_range_parse(range_str) : null
		}

		@ $mol_mem_key
		protected static object_url_ref( path: string ) {
			return this.$.$yuf_url_object.from_blob(this.request( path ).success().blob())
		}

		static object_url(path: string) {
			return this.object_url_ref(path).url
		}

		@ $mol_action
		static request_native(path: RequestInfo, init?: $yuf_transport_params) {
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

		@ $mol_action
		static override request(path: RequestInfo, init?: $yuf_transport_params) {
			return this.$.$yuf_transport_request.make({
				$: this.$,
				native_grab: auth_token => this.request_native(path, {...init, auth_token }),
			})
		}
	}

}
