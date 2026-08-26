namespace $ {
	export class $yuf_sj_ui_login_model_mock extends $yuf_sj_ui_login_model {
	
		override mock(next?: ReturnType<this['defaults']> | null) {
			if (next?.password && next.password !== 'root') {
				throw new Error('AUTH_FAILED', {
					cause: { message: 'Error password, use root' }
				})
			}

			const token = (next?.login && next.password) || this.session().token()
				? '1234567890'
				: next?.token ?? null

			const login = next?.login ?? (token ? $mol_stub_person_name() : null)

			return this.defaults({ login, token, password: null }) as ReturnType<this[ 'defaults' ]>
		}
	}
}
