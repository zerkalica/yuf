namespace $ {
	export class $yuf_transport extends $mol_object {

		// custom range headers
		static range(path: string, raw?: $yuf_transport_request_make_params & { count_prefer?: 'exact' | 'planned' }) {
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
			return this.$.$yuf_url_object.from_blob(this.success( path ).blob())
		}

		static object_url(path: string) {
			return this.object_url_ref(path).url
		}

		@ $mol_action
		protected static request(path: RequestInfo, init?: $yuf_transport_request_make_params) {
			const native = this.$.$yuf_transport_request_make(path, init)
			return this.$.$yuf_transport_request.make({ native })
		}

		static response(path: RequestInfo, init?: $yuf_transport_request_make_params) {
			const session = this.$.$mol_one.$yuf_session

			return this.$.$yuf_transport_retry(
				auth_token => this.request(path, { ...init, auth_token, client_id: session.client_id() }).response(),
				reset => reset === null || init?.auth_token === undefined
					? session.token_grab(reset)
					: (init.auth_token || undefined),
			)
		}

		static success(path: RequestInfo, init?: $yuf_transport_request_make_params) {
			const response = this.response(path, init)
			if( response.status() === 'success' ) return response
			
			throw new Error( response.message(), { cause: response } )
		}
	}

}
