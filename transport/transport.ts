namespace $ {

	export function $yuf_transport_pass(data: unknown) { return data }

	export class $yuf_transport extends $mol_fetch {

		@ $mol_mem
		static base_url(next?: string) {
			const url = this.$.$mol_state_arg.value( 'api_url', next )
			if (url) return url

			return ''
		}

		static base_url_full() {
			const url = this.base_url()
			if (url.match(/^\w+\:/)) return url

			const loc = this.$.$mol_dom_context.location

			let normalized = url.replace(/^\/+/, '')
			if (normalized) normalized = '/' + normalized

			return `${loc.origin}${normalized}`
		}

		static base_url_ws() {
			return this.base_url_full().replace(/^http/, 'ws')
		}

		static session() { return this.$.$mol_one.$yuf_session }

		static get(path: string, params?: $yuf_transport_request_data) {
			return this.success(path, { ...params, method: 'GET' })
		}

		static head(path: string, params?: $yuf_transport_request_data) {
			return this.success(path, { ...params, method: 'HEAD' })
		}

		// custom range headers
		static range(path: string, raw?: $yuf_transport_request_data & { count_prefer?: 'exact' | 'planned' }) {
			const { count_prefer, ...params } = raw ?? {}
			const res = this.head(path, {
				...params,
				headers: $yuf_header_merge(params?.headers, {
					'Range-Unit': 'items',
					Prefer: `count=${count_prefer ?? 'exact'}`,
				}),
			})

			const range_str = res.headers().get('Content-Range')

			return range_str ? $yuf_header_range_parse(range_str) : null
		}

		static put(path: string, params?: $yuf_transport_request_data) {
			return this.success(path, { ...params, method: 'PUT' })
		}

		static post(path: string, params?: $yuf_transport_request_data) {
			return this.success(path, { ...params, method: 'POST' })
		}

		static delete(path: string, params?: $yuf_transport_request_data) {
			return this.success(path, { ...params, method: 'DELETE' })
		}

		@ $mol_mem_key
		static object_url_ref( path: string ) {
			return new this.$.$yuf_url_object(this.get( path ).blob())
		}

		static object_url(path: string) {
			return this.object_url_ref(path).url
		}

		static auth_fails() { return false }

		@ $mol_action
		static request_native(path: RequestInfo, init?: $yuf_transport_request_data) {
			const input = typeof path === 'string' && ! path.match(/^(\w+:)?\/\//)
				? this.base_url() + path
				: path

			const session = this.session()

			const client_id = session.client_id()
			const token = init?.auth_token === undefined ? session.token() : init.auth_token

			const body = init?.body ?? (init?.body_object ? JSON.stringify(init.body_object) : undefined)
			const headers_base = $yuf_header_normalize(init?.headers)
			let content_type = headers_base.get('Content-Type')

			if (content_type === undefined) {
				if (body instanceof URLSearchParams) content_type = 'application/x-www-form-urlencoded'
				else if ( ! (body instanceof FormData) ) content_type = 'application/json'
			}

			const id = $mol_guid()

			const headers = $yuf_header_merge(headers_base, {
				'Authorization': token ? `Bearer ${token}` : null,
				'X-Request-ID': id,
				'X-Client-ID': client_id,
				'Content-Type': content_type,
			})

			return new Request(input, { ...init, body, headers })
		}

		@ $mol_action
		static override request(path: RequestInfo, init?: $yuf_transport_request_data) {
			let request = this.request_make(path, init)
			// const response = request.response()
			// const code = response.code()

			// if ((code === 403 || code === 401) && ! init?.auth_fails) {
			// 	const auth_token = this.session().token(null, 'refresh')

			// 	request = this.request_make( path , { ...init, auth_token } )
			// }

			return request
		}

		@ $mol_action
		protected static request_make(path: RequestInfo, init?: $yuf_transport_request_data) {
			return this.$.$yuf_transport_request.make({
				$: this.$,
				native: this.request_native(path, init),
				deadline: () => init?.deadline ?? 20_0000
			})
		}
	}

}
