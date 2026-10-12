namespace $ {
	export function $yuf_fetch_response_ok(response: $mol_fetch_response) {
		if (! response.ok()) throw new Error(response.message(), { cause: response })
		return response
	} 

	export function $yuf_fetch(
		this: $,
		path: RequestInfo,
		init?: Omit<$yuf_request_init, 'auth_token'> & {
			auth_token?: null | string | ((reset?: null) => null | string)
		},
		make_response = (auth_token?: string | null) => this.$yuf_request.from_params({ ...init, path, auth_token }).response(),
	) {
		const auth_token = init?.auth_token
		const reset = typeof auth_token === 'function' ? auth_token : () => auth_token ?? null

		let response = make_response(reset())
		if (response.code() === 403 || response.code() === 401) response = make_response(reset(null))
		return response
	}

}
