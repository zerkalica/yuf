namespace $.$$ {
	export class $yuf_login_form extends $.$yuf_login_form {
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

		override save(next?: Event) {
			try {
				this.enter({
					login: this.login(),
					password: this.password(),
				})
			} catch (e) {
				if ($mol_promise_like(e)) $mol_fail_hidden(e)
				if (
					e instanceof Error
					&& e.cause instanceof $mol_fetch_response
					&& (e.cause.code() === 401 || e.cause.code() === 403)
				) {
					const msg = this.login_error()
					if (! e.message.startsWith(msg) ) e.message = msg + ': ' + e.message
				}

				$mol_fail_hidden(e)
			}
		}

		override submit_activate_fork(e: Event) {
			// prevent cancelling save task if other button pressed, while saving
			return $mol_wire_async(this).submit_activate(e)
		}
	}
}
