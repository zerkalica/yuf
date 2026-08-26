namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const vr = $mol_data_variant
	const cnst = $mol_data_const
	const arr = $mol_data_array

	const auth_dto = rec({
		login: opt(nul(str)),
		password: opt(nul(str)),
		token: opt(nul(str)),
	})

	export class $yuf_sj_ui_login_model extends $yuf_ws_entity<typeof auth_dto.Value> {
		override type() { return 'auth' }

		override device() {
			return this.id() ? [ this.id() ] : []
		}

		override defaults(raw?: {}) {
			return auth_dto({
				login: null,
				password: null,
				token: undefined,
				...raw,
			})
		}

		session() { return this.$.$mol_one.$yuf_session }

		login(next?: string | null) { return this.value('login', next) }
		password(next?: string | null) { return this.value('password', next) }
	}

}
