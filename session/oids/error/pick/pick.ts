namespace $ {
	export function $yuf_session_oids_error_pick(obj: unknown) {
		return obj
			&& typeof obj === 'object'
			&& 'error' in obj
			&& typeof obj.error === 'string'
				? obj as {
					error: keyof typeof $yuf_session_oids_error_code
					error_description?: string
					error_uri?: string
				}
				: null
	}
}
