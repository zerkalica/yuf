namespace $.$$ {
	export class $yuf_sj_ui_login_form extends $.$yuf_sj_ui_login_form {
		override value_str(field: 'login' | 'password') {
			return this[field]()
		}

		@ $mol_mem
		protected login_focus() {
			new $mol_after_timeout(100, () => {
				this.Login().focused(true)
			})
		}

		override auto() {
			this.login_focus()
			return super.auto()
		}

		override submit_activate_fork(e: Event) {
			// prevent cancelling save task if other button pressed, while saving
			return $mol_wire_async(this).submit_activate(e)
		}

		@ $mol_mem
		override result( next?: string | Error ) {
			if (next instanceof Error) {

				const message = typeof next.cause === 'object'
					&& next.cause
					&& 'message' in next.cause
					&& typeof next.cause.message === 'string'
						? next.cause.message
						: ''

				next = (this.errors()[next.message] || next.message || this.form_invalid())
					+ `${message ? `: ${message}` : ''}`
			}

			return next ?? ''
		}

		override save(next?: Event) {
			return $mol_error_fence(
				() => this.enter({
					login: this.login(),
					password: this.password(),
				}),
				e => e.message === 'AUTH_FAILED'
					? new $mol_error_mix('Wrong password', e.cause as {}, e)
					: e
			)
		}
	}
}
