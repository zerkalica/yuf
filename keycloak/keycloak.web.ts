namespace $ {
	type $yuf_keycloak_web_bundle = typeof import('./.npm/.app')

	export class $yuf_keycloak_web extends $yuf_keycloak {
		@ $mol_memo.field
		static get _() { return new this() }

		@ $mol_mem
		protected static module() {
			$mol_wire_solid()
			return this.$.$mol_import.script('yuf/keycloak/.npm/-/app.js').$yuf_keycloak_npm as $yuf_keycloak_web_bundle
		}

		// При возврате с сайта авторизации, keycloak пихает свои параметры в урл.
		// Вызов kc.init выпиливает их, т.е. меняет href, который аргумент у kc.init
		// Поэтому mol запускает kc.init с нуля и тот падает, т.к. проверяет повторные запуски
		// mol_action кэшит href до завершения kc_inited и аргументы kc.init не меняются
		@ $mol_action
		protected redirect_url() {
			const loc = this.$.$mol_dom_context.location

			return loc.href
		}

		protected Keycloak() {
			return this.factory().module().Keycloak
		}

		@ $mol_action
		protected kc_instance() {
			const Keycloak = this.Keycloak()

			const kc = new Keycloak({
				url: this.url(),
				realm: this.realm(),
				clientId: this.client_id(),
			})

			kc.init = kc.init.bind(kc, {
				token: this.token() || undefined,
				idToken: this.token_extra('id') || undefined,
				refreshToken: this.token_extra('refresh') || undefined,
				redirectUri: this.redirect_url(),
				enableLogging: true,
				timeSkew: 0,
				minValidity: this.min_validity()
			})

			return $mol_wire_sync($yuf_error_safe(kc))
		}

		@ $mol_mem
		protected kc() {
			const kc = this.kc_instance()
			const inited = kc.init()
			if (! inited) throw new Error('Cant\'t init keycloak')
			return kc
		}

		factory() {
			return this.constructor as typeof $yuf_keycloak_web
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
			return this.kc().createRegisterUrl({ redirectUri: this.redirect_url() })
		}

		login_url() {
			return this.kc().createLoginUrl({ redirectUri: this.redirect_url() })
		}

		register() {
			this.$.$mol_dom_context.location.replace(this.register_url())
		}

		@ $mol_action
		override login_goto() {
			this.$.$mol_dom_context.location.replace(this.login_url())
		}

		@ $mol_mem
		override token(next?: string | null, op?: 'logout' | 'refreshed') {
			let kc = $mol_wire_probe(() => this.kc())

			if (next === null) {
				const logout = op === 'logout'
				// if kc not loaded and calling logout - just delete all tokens
				// Do not wait logout - just delete all keys
				if (logout) {
					kc && $mol_wire_async(kc).logout()
					kc = undefined
				} else {
					kc = this.kc()
					if (op !== 'refreshed' && ! kc.updateToken(-1) ) kc = undefined
				}
			}

			if (next === undefined) {
				try {
					kc = this.kc()
				} catch (e) {
					// in pull mode - return token from local storage, while kc loading
					if ( $mol_promise_like(e) ) return super.token(next)
					$mol_fail_hidden(e)
				}
			}

			next = kc?.authenticated && kc.token ? kc.token : null
			const id_token = kc?.idToken || null
			const refresh_token = kc?.refreshToken || null

			this.token_extra('id') !== id_token && this.token_extra('id', id_token)
			this.token_extra('refresh') !== refresh_token && this.token_extra('refresh', refresh_token)

			return super.token() === next ? next : super.token(next)
		}

		@ $mol_mem
		override logged(reset?: null) {
			return this.kc().authenticated ?? false
		}
	}

	function clean_url(url: string) {
		return url.replace(/(?:&(?:state|session_state|code))=(?:[\d\w.-]+)/g, '')
	}

	$.$yuf_session = $yuf_keycloak_web

	const prev = $.$mol_state_arg.href
	$.$mol_state_arg.href = function $mol_state_arg_href(next?: string) {
		return clean_url(prev.call(this, next))
	}
}
