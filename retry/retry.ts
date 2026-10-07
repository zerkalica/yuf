namespace $ {
	export function $yuf_retry<Res>(
		make_request: (token: string | undefined) => Res,
		grab_token: (reset?: null) => string | null | undefined,
		is_ok: (res: Res) => boolean
	): Res {
		let token = grab_token() || undefined

		const response = make_request(token)
		if (is_ok(response)) return response

		token = grab_token(null) || undefined
		if (! token) return response

		return make_request(token)
	}
}
