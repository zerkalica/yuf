namespace $ {
	export class $yuf_keycloak extends $yuf_session {
		@ $mol_memo.field
		static get _() { return new this() }

		client_id() { return 'mssc' }
		url() { return '' }
		realm() { return '' }
		min_validity() { return 30 }

		state() { return this.$.$mol_state_local }

		@ $mol_mem
		protected token_refresh(next?: string | null) {
			return this.state().value(`kc_refreshToken`, next === '' ? null : next) ?? null
		}

		@ $mol_mem
		protected token_idt(next?: string | null) {
			return this.state().value(`kc_id_token`, next === '' ? null : next) ?? null
		}

		login_goto() {
			throw new Error('Implement')
		}
	}
}
