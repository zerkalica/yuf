namespace $ {
	export class $yuf_keycloak extends $yuf_session {
		@ $mol_memo.field
		static get _() { return new this() }

		client_id() { return 'mssc' }
		url() { return '' }
		realm() { return '' }
		min_validity() { return 30 }

		state() { return this.$.$mol_state_local }

		@ $mol_mem_key
		protected token_extra(key: 'refresh' | 'id', next?: string | null) {
			return this.state().value(`${this.token_key()}_${key}`, next === '' ? null : next) || null
		}

		login_goto() {
			throw new Error('Implement')
		}
	}
}
