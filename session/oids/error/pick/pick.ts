namespace $ {
	export function $yuf_session_oids_error_pick(obj: unknown) {
		return obj
			&& typeof obj === 'object'
			&& ('error' in obj || 'errorMessage' in obj)
				? obj as {
					error: keyof typeof $yuf_session_oids_error_code
					error_description?: string
					errorMessage?: string
					error_uri?: string
				}
				: null
	}
}
