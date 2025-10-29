namespace $ {
	export class $yuf_session extends $mol_object {
		client_id() { return this.$.$mol_dom_context.location.hostname }
		token_key() { return `${this.client_id()}_token` }

		token(next?: string | null, op?: 'refresh' | 'logout') {
			return this.$.$mol_state_local.value(this.token_key(), next === '' ? null : next) || null
		}

		user_id() { return null as null | string }

		user_id_ensure() {
			const user_id = this.user_id()
			if (! user_id) throw new Error('Required user_id in session')
			return user_id
		}

		@ $mol_action
		token_cut() { return this.token() }

		@ $mol_mem
		logged() { return Boolean(this.token()) }
		logout() { return this.token(null, 'logout') }
	}

}
