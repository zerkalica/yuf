namespace $ {
	export class $yuf_session extends $mol_object {
		client_id() { return this.$.$mol_dom_context.location.hostname }
		token_key() { return `${this.client_id()}_token` }

		token(next?: string | null, op?: 'refresh') {
			return this.$.$mol_state_local.value(this.token_key(), next === '' ? null : next) || null
		}

		@ $mol_action
		token_grab(reset?: null) {
			return this.token(reset, reset === null ? 'refresh' : undefined)
		}

		user_id() { return null as null | string }

		@ $mol_mem
		logged() { return Boolean(this.token()) }
		logout() { this.token(null) }

		roles() { return [] as readonly string[] }
	}

}
