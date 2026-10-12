namespace $ {
	export function $yuf_retry<Res, Token>(
		make_request: (token: Token | undefined | null) => Res,
		reset: (reset?: null) => Token | null | undefined,
		is_ok: (res: Res) => boolean
	): Res {
		let token = reset() || undefined

		const response = make_request(token)
		if (is_ok(response)) return response

		token = reset(null) || undefined
		if (! token) return response

		return make_request(token)
	}
}
