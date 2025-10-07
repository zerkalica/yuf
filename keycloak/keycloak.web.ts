namespace $ {
	type $yuf_keycloak_web_bundle = typeof import('./.npm/.app')

	type $yuf_keycloak_web_config =
		ConstructorParameters<typeof import('./.npm/.app').Keycloak>[0]
		& Parameters<InstanceType<typeof import('./.npm/.app').Keycloak>['init']>[0]

	type KCCOnfig = $yuf_keycloak_web_config & {
		minValidity?: number
	}

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

		async kc_raw(params: KCCOnfig) {
			const { Keycloak } = this.factory().module()
			const kc = $yuf_error_safe(new Keycloak(params))

			kc.onAuthRefreshSuccess = $mol_wire_async(() => this.on_refresh_success())
			kc.onAuthRefreshError = $mol_wire_async(() => this.on_refresh_error())
			kc.onTokenExpired = $mol_wire_async(() => this.on_expired())

			await kc.init(params)
			return kc
		}


		@ $mol_mem
		@ $mol_action
		kc() {
			const params: KCCOnfig = {
				url: this.url(),
				realm: this.realm(),
				clientId: this.client_id(),
				token: this.token_stored() || undefined,
				idToken: this.token_idt() || undefined,
				refreshToken: this.token_refresh() || undefined,
				redirectUri: this.redirect_url(),
				enableLogging: true,
				timeSkew: 0,
				minValidity: this.min_validity()
			}

			const kc_raw = $mol_wire_sync(this).kc_raw(params)

			const kc = $mol_wire_sync(kc_raw)

			this.token_stored(kc.authenticated ? kc.token : '')
			this.token_refresh(kc.refreshToken)
			this.token_idt(kc.idToken)

			this.$.$mol_log3_rise({
				place: `${this.factory()}.kc()`,
				message: `start`,
				...this.kc_debug_context(kc)
			})

			return kc
		}

		factory() {
			return this.constructor as typeof $yuf_keycloak_web
		}

		protected kc_debug_context(kc: ReturnType<typeof this.kc>) {
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

		protected on_expired() { this.update() }

		@ $mol_action
		protected update(validity = this.min_validity()) {
			const kc = this.kc()
			const updated = kc.updateToken(validity)

			this.$.$mol_log3_rise({
				place: `${this.factory()}.update()`,
				message: `valid ${validity} sec`,
				updated: updated ? 'updated' : 'not updated',
				...this.kc_debug_context(kc)
			})

			return updated
		}

		@ $mol_action
		on_refresh_success() {
			const kc = this.kc()
			this.$.$mol_log3_rise({
				place: `${this.factory()}.success()`,
				message: 'Token refreshed',
				...this.kc_debug_context(kc)
			})
			this.token_stored(kc.authenticated ? kc.token : '')
			this.token_refresh(kc.refreshToken)
			this.token_idt(kc.idToken)
		}

		@ $mol_action
		on_refresh_error() {
			const kc = this.kc()

			this.$.$mol_log3_warn({
				place: `${this.factory()}.error()`,
				message: 'Token refresh error',
				hint: 'see keycloak.onAuthRefreshError',
				...this.kc_debug_context(kc)
			})

			this.token_stored(null)
			this.token_refresh(null)
			this.token_idt(null)
		}

		register_url() {
			return this.kc().createRegisterUrl({ redirectUri: this.redirect_url() })
		}

		login_url() {
			return this.kc().createLoginUrl({ redirectUri: this.redirect_url() })
		}

		@ $mol_action
		override login_goto() {
			this.$.$mol_dom_context.location.replace(this.login_url())
		}

		register() {
			this.$.$mol_dom_context.location.replace(this.register_url())
		}

		@ $mol_mem
		override token(next?: string | null, refresh?: 'refresh') {
			const kc = this.kc()
			if (next !== undefined && refresh) {
				this.update(-1)
			}

			if (next === undefined && kc.authenticated && kc.isTokenExpired(this.min_validity())) {
				this.update()
			}

			if (next === null && kc.authenticated) {
				kc.logout()
			}

			const stored = this.token_stored(next)

			if (kc.token && kc.token !== stored) this.token_stored(kc.token)

			if (! kc.authenticated) return null

			return kc.token ?? stored ?? null
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
