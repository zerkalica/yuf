namespace $ {
	export function $yuf_transport_retry<Res extends { code(): number }>(
		make_request: (token: string) => Res,
		grab_token: (reset?: null) => string | null
	): Res {
		let token = grab_token() ?? ''

		const response = make_request(token)
		const code = response.code()

		if (code !== 403 && code !== 401) return response

		token = grab_token(null) ?? ''
		if (! token) return response

		return make_request(token)
	}
}
