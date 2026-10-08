namespace $ {
	const rec = $mol_data_record
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const str = $mol_data_string
	const num = $mol_data_number
	const bool = $mol_data_boolean
	const arr = $mol_data_array
	const dict = $mol_data_dict
	const vr = $mol_data_variant

	const Roles_dto = rec({
		roles: arr(str),
	})

	const Token_headers_dto = dict(str)

	const Token_payload_dto = rec({
		iss: opt(nul(str)),
		sub: opt(nul(str)),
		sid: opt(nul(str)),
		aud: opt(nul(vr(str, arr(str)))),
		exp: opt(nul(num)),
		iat: opt(nul(num)),
		auth_time: opt(nul(num)),
		nonce: opt(nul(str)),
		acr: opt(nul(str)),
		amr: opt(nul(str)),
		azp: opt(nul(str)),
		session_state: opt(nul(str)),
		realm_access: opt(nul(Roles_dto)),
		resource_access: opt(nul(dict(Roles_dto))),

		groups: opt(nul(arr(str))),
		group_membership: opt(nul(arr(str))),
	})

	const Token_dto = rec({
		headers: opt(nul(Token_headers_dto)),
		payload: opt(nul(Token_payload_dto)),
	})

	export function $yuf_oids_token_data(token: string) {
		const data = $mol_jwt_decode(token)

		return $mol_error_fence(
			() => data ? Token_dto( data ) : null,
			e => new $mol_error_mix('Invalid token', { data }, e)
		)

	}
}
