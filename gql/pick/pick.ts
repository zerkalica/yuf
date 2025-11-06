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

	export function $yuf_gql_pick(raw?: {} | null, error_code?: string | null) {
		if ( raw && typeof raw === 'object' && ! Array.isArray(raw) && 'data' in raw && ! error_code) {
			return raw.data
		}

		const errors = raw && typeof raw === 'object'
			? (raw as { errors?: readonly typeof $yuf_gql_pick_message.Value[]})?.errors
			: null

		const error: typeof $yuf_gql_pick_message.Value = errors?.[0] ?? {
			message: 'Unknown gql error',
			extensions: []
		}

		const extensions: null | typeof error_dto.Value[] = Array.isArray(error.extensions)
			? error.extensions
			: error.extensions ? [ error.extensions ] : null
		const json = extensions?.[0] ?? null

		const message = json?.internal?.error?.message || json?.error || error.message || ''
		const code = json?.internal?.error?.status_code || json?.code || error_code || 'ASSERT_FAILED'

		throw new Error(code, { cause: { message } } )
	}

}
