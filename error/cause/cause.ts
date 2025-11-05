namespace $ {

	export type $yuf_error_cause_code = 
		| 'AUTH_FAILED'
		| 'ACCESS_DENIED'
		| 'TIMEOUT'
		| 'BAD_JSON'
		| 'ASSERT_FAILED'
		| 'UNKNOWN'

	export class $yuf_error_cause extends $mol_object {
		readonly code: string
		readonly extra = null as Record<string, unknown> | null

		constructor(
			cause: string | unknown,
			extra: Record<string, unknown> | null = null,
		) {
			super()

			this.code = typeof cause === 'string' && cause
				? cause
				: cause instanceof $yuf_error_cause ? cause.code : 'UNKNOWN'

			this.extra = typeof cause === 'string' || ! cause ? extra :  {
				... (cause instanceof $yuf_error_cause ? cause.extra : { parent: cause }),
				... extra
			}
		}

		static error(
			e: Error,
			code: string,
			extra: Record<string, unknown> | null = null,
		) {
			const cause = new $yuf_error_cause(e.cause ?? code, extra)

			return new $mol_error_mix(e.message, cause, e)
		}

	}
}
