namespace $ {
	type Params_error = {
		error: keyof typeof $yuf_oids_error_code
		error_description?: string
		error_uri?: string
		errorMessage?: ''
		field?: string
	} | {
		errorMessage: 'error-invalid-length'
		field?: string
		params?: [
			field_name: string,
			min: number,
			max: number,
		]
	}

	export function $yuf_oids_error_pick(obj: unknown) {
		return obj
			&& typeof obj === 'object'
			&& ('error' in obj || 'errorMessage' in obj)
				? obj as Params_error
				: null
	}

}
