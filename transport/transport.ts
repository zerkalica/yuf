namespace $ {
	export type $yuf_transport_params =  Omit<RequestInit, 'headers'> & {
		deadline?: number
		headers?: RequestInit['headers'] | $yuf_header_rec
		auth_token?: string | null // null - auth disabled
	}

	export class $yuf_transport extends $mol_object {

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
			return this.$.$yuf_url_object.from_blob(this.success( path ).blob())
		}

		static object_url(path: string) {
			return this.object_url_ref(path).url
		}

		@ $mol_action
		static request(path: RequestInfo, init?: $yuf_transport_params) {
			const native = this.$.$yuf_transport_request_make(path, init)
			return this.$.$yuf_transport_request.make({ native })
		}

		static response(path: RequestInfo, init?: $yuf_transport_params) {
			let response = this.request(path, init).response()
			const code = response.code()
			if ( init?.auth_token !== null && (code === 403 || code === 401) ) {
				response = this.request(path, { ...init, auth_token: 'new' }).response()
			}

			return response
		}

		static success(path: RequestInfo, init?: $yuf_transport_params) {
			const response = this.response(path, init)
			if( response.status() === 'success' ) return response
			
			throw new Error( response.message(), { cause: response } )
		}
	}

}
