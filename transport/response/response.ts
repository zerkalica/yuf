namespace $ {
	export class $yuf_transport_response extends $mol_fetch_response {
		override json() {
			let text = undefined as undefined | string

			return $mol_error_fence(
				() => JSON.parse(text = this.text()) as unknown,
				e => e.cause instanceof $mol_fetch_response
					? e
					: new $mol_error_mix(e.message, { response: this, ... e.cause || {} }, e)
			)
		}

		data<V>(assert: (v: any) => V) {
			const json = this.json()

			return $mol_error_fence(
				() => assert(json),
				e => e.cause instanceof $mol_fetch_response
					? e
					: new $mol_error_mix(e.message, { response: this, ... e.cause || {} }, e)
			)
		}
	}
}
