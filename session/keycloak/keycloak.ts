namespace $ {
	export class $yuf_session_keycloak extends $yuf_session_oids {
		@ $mol_memo.field
		static get _() { return new this() }

		login_goto() {
			throw new Error('Implement')
		}
	}
}
