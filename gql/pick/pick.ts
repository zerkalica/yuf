namespace $ {
	const rec = $mol_data_record
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const str = $mol_data_string
	const arr = $mol_data_array
	const vr = $mol_data_variant

	const error_dto = rec({
		code: opt(nul(str)),
		error: opt(nul(str)),
		path: opt(nul(str)),
		internal: opt(nul(rec({
			error: opt(nul(rec({
				message: opt(nul(str)),
				status_code: opt(nul(str)),
			}))),
		})))
	})

	export const $yuf_gql_pick_message = rec({
		message: opt(str),
		extensions: opt(vr(error_dto, arr(error_dto)))
	})

	export function $yuf_gql_pick_error(raw?: { data?: unknown, errors?: unknown } | null) {
		const errors = raw && typeof raw === 'object'
			? (raw as { errors?: readonly typeof $yuf_gql_pick_message.Value[]})?.errors
			: null

		if (! errors ) return null

		const error: typeof $yuf_gql_pick_message.Value = errors?.[0] ?? {
			message: 'Unknown gql error',
			extensions: []
		}

		const extensions: null | typeof error_dto.Value[] = Array.isArray(error.extensions)
			? error.extensions
			: error.extensions ? [ error.extensions ] : null
		const json = extensions?.[0] ?? null

		const message = json?.internal?.error?.message || json?.error || error.message || ''
		const code = json?.internal?.error?.status_code || json?.code || 'ASSERT_FAILED'

		return { code, message }
	}

	export function $yuf_gql_pick(json?: { data?: unknown, errors?: unknown } | null) {
		if ( json && typeof json === 'object' && ! Array.isArray(json) && json.data !== undefined && json.errors === undefined) {
			return json.data
		}

		const { code , message } = $yuf_gql_pick_error(json) ?? { message: 'UNKNOWN' }

		throw new Error(message, { cause: { code } } )
	}

}
