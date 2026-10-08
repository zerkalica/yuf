namespace $ {
	export function $yuf_oids_error_pick(obj: unknown) {
		return obj
			&& typeof obj === 'object'
			&& ('error' in obj || 'errorMessage' in obj)
				? obj as {
					error: keyof typeof $yuf_oids_error_code
					error_description?: string
					errorMessage?: string
					error_uri?: string
				}
				: null
	}

	export function $yuf_oids_error_pick_field(cause: unknown) {
		return cause && typeof cause === 'object' && 'json' in cause
			? (cause as { json: {
				field?: string
				params?: readonly string[]
			}} ).json
			: null
	}

}
