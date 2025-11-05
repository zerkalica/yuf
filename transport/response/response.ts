namespace $ {
	export class $yuf_transport_response extends $mol_fetch_response {
		override json() {
			let text = undefined as undefined | string

			return $yuf_error_fence(
				() => JSON.parse(text = this.text()),
				e => $yuf_error_cause.error(
					e,
					text === undefined ? 'UNKNOWN' : 'BAD_JSON',
					{ response: this }
				)
			)
		}

		data<V>(assert: (v: any) => V) {
			const json = this.json()

			return $yuf_error_fence(
				() => assert(json),
				e => $yuf_error_cause.error(e, 'ASSERT_FAILED', { response: this })
			)
		}
	}
}
