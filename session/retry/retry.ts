namespace $ {
	export function $yuf_session_retry<Req extends { code(): number }>(
		this: $,
		cb: (token: string) => Req
	) {
		return this.$yuf_transport_retry(
			token => cb(token),
			reset => this.$mol_one.$yuf_session.token_grab(reset) ?? ''
		)
	}

}
