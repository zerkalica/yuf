namespace $ {
	export class $yuf_transport extends $mol_object {

		static response(path: RequestInfo, init?: $yuf_transport_request_init) {
			const session = this.$.$mol_one.$yuf_session

			return this.$.$yuf_transport_retry(
				auth_token => this.$.$yuf_transport_request.from_path(path, { ...init, auth_token, client_id: session.client_id() }).response(),

				reset => reset === null || init?.auth_token === undefined
					? session.token_grab(reset)
					: (init.auth_token || undefined),
			)
		}

		static success(path: RequestInfo, init?: $yuf_transport_request_init) {
			const response = this.response(path, init)
			if( response.status() === 'success' ) return response

			throw new Error( response.message(), { cause: response } )
		}
	}

}
