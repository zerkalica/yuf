namespace $ {
	export class $yuf_session extends $mol_object {
		@ $mol_memo.field
		static get _() { return new this() }

		token_key() { return 'kc_token' }

		token(next?: string | null, op?: 'logout' | 'refreshed') {
			return this.$.$mol_state_local.value(this.token_key(), next === '' ? null : next) || null
		}

		@ $mol_mem
		logged() { return Boolean(this.token()) }
		refresh() { return this.token(null) }
		logout() { return this.token(null, 'logout') }

	}
}
