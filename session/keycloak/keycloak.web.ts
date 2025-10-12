namespace $ {
	type $yuf_session_keycloak_web_bundle = typeof import('./.npm/.app')

	export class $yuf_session_keycloak_web extends $yuf_session_keycloak {
		@ $mol_memo.field
		static get _() { return new this() }

		@ $mol_mem
		protected static module() {
			$mol_wire_solid()
			return this.$.$mol_import.script('yuf/keycloak/.npm/-/app.js').$yuf_session_keycloak_npm as $yuf_session_keycloak_web_bundle
		}

		protected Keycloak() {
			return this.factory().module().Keycloak
		}

		@ $mol_action
		protected kc_instance() {
			const Keycloak = this.Keycloak()

			const kc = new Keycloak({
				url: this.auth_server_url(),
				realm: this.realm(),
				clientId: this.client_id(),
			})

			kc.init = kc.init.bind(kc, {
				token: this.token() || undefined,
				idToken: this.token_id() || undefined,
				refreshToken: this.token_refresh() || undefined,
				redirectUri: this.redirect_uri(),
				enableLogging: true,
				timeSkew: 0,
				minValidity: this.min_validity()
			})

			// listen sso iframe logout command
			kc.onAuthLogout = $mol_wire_async(() => this.token(null))

			return $mol_wire_sync($yuf_error_safe(kc))
		}

		min_validity() { return 30 }

		@ $mol_mem
		protected kc() {
			const kc = this.kc_instance()
			const inited = kc.init()
			if (! inited) throw new Error('Cant\'t init keycloak')
			return kc
		}

		factory() {
			return this.constructor as typeof $yuf_session_keycloak_web
		}

		protected kc_debug_context(
			kc: Pick<
				InstanceType<ReturnType<typeof this.Keycloak>>,
				'authenticated' | 'token' | 'refreshToken' | 'idToken' | 'isTokenExpired'
			>
		) {
			const num = -5

			return {
				expired: ! kc.authenticated || kc.isTokenExpired(this.min_validity()) ? 'expired' : 'not expired',
				authenticated: kc.authenticated ? 'authenticated' : 'not authenticated',
				token_tails: [
					kc.token?.slice(num),
					kc.refreshToken?.slice(num),
					kc.idToken?.slice(num),
				]
			}
		}

		register_url() {
			return this.kc().createRegisterUrl({ redirectUri: this.redirect_uri() })
		}

		login_url() {
			return this.kc().createLoginUrl({ redirectUri: this.redirect_uri() })
		}

		register() {
			this.$.$mol_dom_context.location.replace(this.register_url())
		}

		@ $mol_action
		override login_goto() {
			this.$.$mol_dom_context.location.replace(this.login_url())
		}

		override token_refresh(next?: string | null) {
			const kc = $mol_wire_probe(() => this.kc())

			if (kc && next === null) {
				const prev = kc.onAuthLogout

				try {
					kc.onAuthLogout = undefined
					// clearToken calls onAuthLogout
					kc.clearToken()
				} finally {
					kc.onAuthLogout = prev
				}
			}

			return super.token_refresh(next)
		}

		override logout_send() {
			this.kc().logout({ logoutMethod: 'POST' })
			return null
		}

		override update() {
			let kc: ReturnType<typeof this.kc> | undefined = this.kc()

			if (! kc.updateToken(-1) ) kc = undefined

			const token = kc?.token
			const id_token = kc?.idToken
			const refresh_token = kc?.refreshToken

			return { token, id_token, refresh_token }
		}

	}

	function clean_url(url: string) {
		return url.replace(/(?:&(?:state|session_state|code))=(?:[\d\w.-]+)/g, '')
	}

	$.$yuf_session_keycloak = $yuf_session_keycloak_web

	const prev = $.$mol_state_arg.href
	$.$mol_state_arg.href = function $mol_state_arg_href(next?: string) {
		return clean_url(prev.call(this, next))
	}
}
