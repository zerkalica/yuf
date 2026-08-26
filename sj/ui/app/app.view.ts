namespace $.$$ {

	export class $yuf_sj_ui_app extends $.$yuf_sj_ui_app {

		@ $mol_memo.field
		get $() {
			return super.$.$mol_ambient( {
				$yuf_session: class yuf_sj_ui_app_session extends super.$.$yuf_session {
					override client_id() { return 'sj' }
				},
			} )
		}

		override logout(e?: Event) {
			this.session().logout()
		}

		override server_offline() {
			const ws = this.ws()
			if (ws.ready()) return ''

			return super.server_offline().replace('{error}', ws.error_message())
		}

		override enter() {
			const res = this.auth().data({
				login: this.login(),
				password: this.password(),
			})

			if (! res?.token ) throw new Error('Server auth token is empty')
			this.session().token(res.token)

		}

	}
}
