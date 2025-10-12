namespace $ {
	export class $yuf_session extends $mol_object {
		@ $mol_memo.field
		static get _() { return new this() }

		client_id() { return this.$.$mol_dom_context.location.hostname }
		token_key() { return 'kc_token' }

		token(next?: string | null, op?: 'refresh' | 'logout') {
			return this.$.$mol_state_local.value(this.token_key(), next === '' ? null : next) || null
		}

		@ $mol_action
		token_cut(reset?: 'refresh') { return this.token(reset ? null : undefined, reset) }

		@ $mol_mem
		logged() { return Boolean(this.token()) }
		logout() { return this.token(null, 'logout') }
	}

}
