namespace $ {
	export class $yuf_session extends $mol_object {
		@ $mol_memo.field
		static get _() { return new this() }

		/**
		 * Access token local storage key.
		 */
		token_key() {
			return 'kc_token'
		}

		token_stored(next?: string | null) {
			return this.$.$mol_state_local.value(this.token_key(), next === '' ? null : next) || null
		}

		token(next?: string | null, refresh?: 'refresh') {
			return this.token_stored(next)
		}

		@ $mol_mem
		logged() {
			return Boolean(this.token())
		}

		@ $mol_action
		logout() {
			this.token(null)
			return null
		}

	}
}
