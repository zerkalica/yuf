namespace $ {
	export class $yuf_transport extends $mol_object {

		@ $mol_action
		protected static request(url: RequestInfo, base?: $yuf_transport_request_init) {
			return this.$.$mol_fetch_request.make({ native: $yuf_transport_request_native(url, base) })
		}

		protected static response_raw(
			url: RequestInfo,
			init?: $yuf_transport_request_init,
			token_grab = (reset?: null) => null as null | string
		) {
			return this.$.$yuf_retry(
				auth_token => this.request(url, { ...init, auth_token }).response(),
				reset => init?.auth_token !== undefined ? init.auth_token : token_grab(reset),
				$yuf_transport_authorized
			)
		}

		static response(url: RequestInfo, init?: $yuf_transport_request_init, session = this.$.$mol_one.$yuf_session) {
			const client_id = init?.client_id === null ? null : init?.client_id ?? session.client_id()
			return this.response_raw(url, { ...init, client_id }, reset => init?.auth_token !== undefined ? init.auth_token : session.token_grab(reset))
		}

		static success(path: RequestInfo, init?: Parameters<typeof this.response>[1]) {
			const response = this.response(path, init)
			if( response.status() === 'success' ) return response

			throw new Error( response.message(), { cause: response } )
		}
	}

}
