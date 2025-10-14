namespace $ {
	export class $yuf_session_oids extends $yuf_session {
		@ $mol_memo.field
		static get _() { return new this() }

		auth_server_url() {
			return `//${this.$.$mol_dom_context.location.hostname}/${this.client_id()}-keycloak`
		}

		realm() { return 'mssc' }

		realm_url() {
			return `${this.auth_server_url().replace(/\/+$/, '')}/realms/${encodeURIComponent(this.realm())}`
		}

		protected endpoint(key: 'auth' | 'token' | 'logout' | 'registrations' | 'userinfo' | 'status' | 'step1') {
			let str = key as string

			const config_value = this.config_value(key)
			if (config_value) return config_value

			if (key === 'step1') str = '3p-cookies/step1.html'

			if (key === 'status') {
				const version = this.status_iframe_version()
				str = `login-status-iframe.html${version ? '?' + this.search_params({ version }) : ''}`
			}

			return `${this.realm_url()}/protocol/openid-connect/${str}`
		}

		protected endpoint_config_names() {
			return {
				auth: 'authorization_endpoint',
				token: 'token_endpoint',
				status: 'check_session_iframe',
				logout: 'end_session_endpoint',
				userinfo: 'userinfo_endpoint',
			} as Record<string, null | keyof NonNullable<ReturnType<typeof this.config>>>
		}

		protected config_value(raw: string) {
			const key = this.endpoint_config_names()[raw]
			return ! key ? null : this.config()?.[key] ?? null
		}

		@ $mol_mem
		protected config() {
			$mol_wire_solid()
			const url = `${this.realm_url()}/.well-known/openid-configuration`

			try {
				return this.$.$mol_fetch.json(url) as null | {
					/** URL of the OP's OAuth 2.0 Authorization Endpoint. */
					authorization_endpoint: string
					/** URL of the OP's OAuth 2.0 Token Endpoint. */
					token_endpoint: string
					/** URL of the OP's UserInfo Endpoint. */
					userinfo_endpoint?: string
					/**  URL of an OP iframe that supports cross-origin communications for session state information with the RP Client, using the HTML5 postMessage API. */
					check_session_iframe?: string
					/** URL at the OP to which an RP can perform a redirect to request that the End-User be logged out at the OP. */
					end_session_endpoint?: string
				}
			} catch (e) {
				if ($mol_promise_like(e)) $mol_fail_hidden(e)
				$mol_fail_log(e)
				return null
			}
		}

		status_iframe_version() {
			return null as null | string
		}

		use_query() { return false }

		params_hybrid() {
			return [ 
				'error', 'error_description', 'error_uri',
				'code', 'state', 'session_state', 'kc_action_status', 'iss',
				'access_token', 'token_type', 'id_token'
			] as const
		}

		protected checker_origin() {
			const auth_url = this.endpoint('auth')
			if (auth_url.startsWith('/')) return this.$.$mol_dom.location.origin
			return auth_url.substring(0, auth_url.indexOf('/', 8))
		}

		protected checker_message() {
			const sid = $mol_wire_probe(() => this.token_params())?.sid
			return `${this.client_id()}${sid ? ` ${sid}` : ''}`
		}

		@ $mol_mem
		protected checker() {
			return this.$.$yuf_session_oids_checker.make({
				src: () => this.endpoint('status'),
				origin: () => this.checker_origin(),
				message: () => this.checker_message()
			})
		}

		@ $mol_mem
		url_params(next?: null) {
			const { location } = this.$.$mol_dom_context
			const use_query = this.use_query()
			const raw = use_query ? location.search : location.hash

			const known = this.params_hybrid()
			const pairs = raw.slice(1).split('&').map(rec => rec.split('='))

			const unknown = [] as string[]
			const params = {} as Record<typeof known[number], string | null | undefined>

			for (const [name_raw, val] of pairs) {
				const name = name_raw.trim() as typeof known[number]
				if ( known.includes(name) ) params[name] = val
				else unknown.push(`${name_raw}${val === undefined ? '' : `=${val}`}`)
			}

			const new_part = raw.slice(0, 1) + unknown.join('&')

			const new_url = location.origin
				+ location.pathname
				+ ( use_query ? new_part : location.search )
				+ ( use_query ? location.hash : new_part )

			if (next === null) {
				this.redirect_to(new_url, 'history')
				return null
			}

			return params
		}

		@ $mol_mem
		protected token_id(next?: string | null) {
			if (next === null) super.token(null)
			if (next || next === null) this.redirect_params(null)

			return this.$.$mol_state_local.value(`${this.token_key()}_id`, next === '' ? null : next) || null
		}

		protected token_decode(token: string) {
			return (this.$.$mol_jwt_decode(token).payload || null) as null | {
				iss?: string
				sub?: string
				sid?: string
				aud?: string
				exp?: number
				iat?: number
				auth_time?: number
				nonce?: string
				acr?: string
				amr?: string
				azp?: string
				session_state?: string
				realm_access?: { roles: readonly string[] }
				resource_access?: Record<string, { roles: readonly string[] }>
			}
		}

		@ $mol_mem
		protected token_params() {
			const token = this.token()
			return token ? this.token_decode(token) : null
		}

		realm_roles() { return this.token_params()?.realm_access?.roles ?? [] }

		resource_roles(resource: string) {
			return this.token_params()?.resource_access?.[resource || this.client_id()]?.roles ?? []
		}

		protected auth_headers() {
			const token = this.token()
			if (! token) return null

			return {
				Accept: 'application/json',
				Authorization: 'bearer ' + token,
			}
		}

		@ $mol_mem
		protected user_profile() {
			const headers = this.auth_headers()
			if (! headers) return null

			return this.$.$mol_fetch.json(this.realm_url() + '/account', {
				headers,
				credentials: 'include'
			}) as null | {
				id?: string
				username?: string
				email?: string
				firstName?: string
				lastName?: string
				enabled?: boolean
				emailVerified?: boolean
				totp?: boolean
				createdTimestamp?: number
				attributes?: Record<string, unknown>
			}
		}

		user_id() { return this.user_profile()?.id ?? '' }
		user_name() { return this.user_profile()?.username ?? '' }

		@ $mol_mem
		protected user_info() {
			const headers = this.auth_headers()
			if (! headers) return null

			return this.$.$mol_fetch.json(this.endpoint('userinfo'), { headers, credentials: 'include' }) as {
				sub: string
				[key: string]: any
			}
		}

		@ $mol_mem
		protected token_refresh(next?: string | null) {
			if (next === null) this.token_id(null)

			return this.$.$mol_state_local.value(`${this.token_key()}_refresh`, next === '' ? null : next) || null
		}


		code_verifier() { return '' }

		logout_redirect_uri() {
			return this.redirect_uri()
		}

		@ $mol_action
		redirect_uri() {
			return this.$.$mol_dom_context.location.href
		}

		@ $mol_mem
		redirect_params(next?: [ url: string, state: string, nonce?: string | null, verifier?: string | null ] | null, refresh?: 'refresh') {
			if ( refresh ) next = [
				this.redirect_uri(),
				$mol_guid(36),
				this.use_nonse() ? $mol_guid(36) : null,
				this.pkce_method() ? $mol_guid(96) : null,
			]

			if (next === null) this.url_params(null)

			return this.$.$mol_state_local.value(`${this.token_key()}_redirect`, next)
		}

		scope() { return null as string | null }

		/**
		 * Set the OpenID Connect flow.
		 */
		flow() {
			return 'standard' as 'standard' | 'implicit' | 'hybrid'
		}

		/**
		 * Sets the 'ui_locales' query param in compliance with section 3.1.2.1
		 * of the OIDC 1.0 specification.
		 */
		kc_locale() { return this.$.$mol_locale.lang() }

		/**
		 * By default the login screen is displayed if the user is not logged into
		 * Keycloak. To only authenticate to the application if the user is already
		 * logged in and not display the login page if the user is not logged in, set
		 * this option to `'none'`. To always require re-authentication and ignore
		 * SSO, set this option to `'login'`. To always prompt the user for consent,
		 * set this option to `'consent'`. This ensures that consent is requested,
		 * even if it has been given previously.
		 */
		login_promt() { return null as null | 'none' | 'login' | 'consent' }

		/**
		 * Used just if user is already authenticated. Specifies maximum time since
		 * the authentication of user happened. If user is already authenticated for
		 * longer time than `'maxAge'`, the SSO is ignored and he will need to
		 * authenticate again.
		 */
		max_age() { return null as null | number }

		/**
		 * Used to pre-fill the username/email field on the login form.
		 */
		login_hint() { return null as null | string }

		/**
		 * Used to tell Keycloak which IDP the user wants to authenticate with.
		 */
		kc_idp_hint() { return null as null | string }

		/**
		 * Sets the `acr` claim of the ID token sent inside the `claims` parameter. See section 5.5.1 of the OIDC 1.0 specification.
		 */
		acr() { return null as null | string }

		/**
		 * Configures the 'acr_values' query param in compliance with section 3.1.2.1
		 * of the OIDC 1.0 specification.
		 * Used to tell Keycloak what level of authentication the user needs.
		 */
		acr_values() { return null as null | string }

		/**
		 * Adds a [cryptographic nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)
		 * to verify that the authentication response matches the request.
		 */
		use_nonse() { return true }

		/**
		 * Configures the Proof Key for Code Exchange (PKCE) method to use. This will default to 'SHA-256'.
		 * Can be disabled by passing `null`.
		 */
		pkce_method() {
			return null as null | 'SHA-256'
		}

		@ $mol_action
		pkce_generate(code: string) {
			const algo = this.pkce_method()
			if (! algo) return null
			const data = $mol_wire_sync(this.$).$mol_charset_encode(code)
			const hash_buf = $mol_wire_sync(this.$.$mol_crypto_native.subtle).digest( algo, data )
			const str = this.$.$mol_base64_encode(new Uint8Array(hash_buf))

			return str
				.replace(/\+/g, '-')
				.replace(/\//g, '_')
				.replace(/\=/g, '')
		}

		protected search_params(params: Record<string, string | number | null | undefined>) {
			for (let key in params) {
				if (typeof params[key] === 'number') params[key] = String(params[key])
				if (params[key] === undefined || params[key] === null) delete params[key]
			}
			return new URLSearchParams(params as Record<string, string>)
		}

		@ $mol_mem
		protected action_query() {
			const [ redirect_uri, state, nonce, code_verifier ] = this.redirect_params(null, 'refresh')!
			const scope = this.scope()
			const flow = this.flow()

			return this.search_params({
				client_id: this.client_id(),
				redirect_uri,
				state,
				response_mode: this.use_query() ? 'query' : 'fragment',

				response_type: flow === 'standard' ? 'code'
					: (flow === 'implicit' ? 'id_token token' : 'code id_token token'),

				scope: scope?.startsWith('openid') ? scope : `openid${scope ? ` ${scope}` : ''}`,
				nonce,
				prompt: this.login_promt(),
				max_age: this.max_age(),
				login_hint: this.login_hint(),
				kc_idp_hint: this.kc_idp_hint(),
				ui_locales: this.kc_locale(),
				claims: this.acr() ? JSON.stringify({ id_token: { acr: this.acr() } }) : null,
				acr_values: this.acr_values(),
				code_challenge: code_verifier ? this.pkce_generate(code_verifier) : null,
				code_challenge_method: code_verifier ? this.pkce_method()?.replace('SHA-', 'S') : null,
			})
		}

		@ $mol_mem
		account_url() {
			return this.realm_url() + '/account?' + this.search_params({
				referrer: this.client_id(),
				referrer_uri: this.redirect_uri()
			})
		}

		login_url() { return this.endpoint('auth') + '?' + this.action_query() }
		register_url() { return this.endpoint('registrations') + '?' + this.action_query() }

		@ $mol_mem
		protected logout_params() {
			return this.search_params({
				client_id: this.client_id(),
				id_token_hint: this.token_id(),
				post_logout_redirect_uri: this.logout_redirect_uri(),
			})
		}

		@ $mol_mem
		logout_url() {
			return this.endpoint('logout') + '?' + this.logout_params()
		}

		@ $mol_action
		logout_send() {
			const url = this.endpoint('logout')
			const id_token_hint = this.token_id()
			if (! id_token_hint) return null

			const res = this.$.$mol_fetch.response(url, {
				method: 'POST',
				body: this.logout_params(),
				headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
				}
			})

			return res.native.redirected ? res.native.url : null
		}

		@ $mol_action
		update() {
			const refresh_token = this.token_refresh()
			const url_params = refresh_token ? null  : this.url_params()
			const error = url_params?.error_description

			if (error) {
				throw new Error(error + `${url_params.error ? ` [${url_params.error}]` : ''}`, { cause: url_params })
			}

			const code = url_params?.code
			if (! refresh_token && ! code) return null

			const redirect_pair = refresh_token ? null : this.redirect_params()
			const [redirect_uri, state, nonce, code_verifier ] = redirect_pair ?? []

			if (redirect_uri && url_params?.state !== state) {
				throw new Error('Invalid state in backurl', { cause: {
					stored_state: state,
					back_url_state: url_params?.state,
				}})
			}

			let result = null as {
				access_token?: string
				id_token?: string
				refresh_token?: string
			} | null

			const url = this.endpoint('token')
			const flow = this.flow()
			const start_time = $mol_wire_sync(new Date()).getTime()

			if (flow === 'implicit' && url_params?.access_token && url_params?.id_token) {
				result = {
					access_token: url_params.access_token,
					id_token: url_params.id_token,
				}
			} else {
				result = this.$.$mol_fetch.json(url, {
					method: 'POST',
					credentials: 'include',
					body: this.search_params({
						code,
						grant_type: refresh_token ? 'refresh_token' : 'authorization_code',
						refresh_token,
						client_id: this.client_id(),
						redirect_uri,
						code_verifier,
					}),
					headers: {
						'Content-type': 'application/x-www-form-urlencoded',
					}
				}) as typeof result
			}

			const id_token = nonce && result?.id_token ? this.token_decode(result.id_token) : null

			if (id_token && id_token.nonce !== nonce) {
				throw new Error('Invalid nonce', { cause: {
					stored: nonce?.slice(0, 3),
					server: id_token.nonce?.slice(0, 3)
				} })
			}

			const end_time = $mol_wire_sync(new Date()).getTime()

			const average_time = (start_time + end_time) / 2
			const iat = result?.access_token ? this.token_decode(result?.access_token)?.iat : null
			const skew = iat ? Math.floor(average_time - iat * 1000) : 0

			if ( result?.access_token && this.is_expired(result.access_token, skew) ) {
				throw new Error('Auth token expired')
			}

			return result
		}

		@ $mol_action
		redirect_to(url?: string | null, history?: 'history') {
			if (history) {
				url && this.$.$mol_state_arg.href(url)
				return
			}

			const loc = this.$.$mol_dom_context.location
			new this.$.$mol_after_frame(() => url ? loc.assign(url) : loc.reload())
		}

		min_validity() { return 5000 }

		protected time_skew = 0

		@ $mol_mem
		override token(next?: string | null, op?: 'refresh' | 'logout') {
			const checker = this.checker()
			const status = checker.status()
			if (status === 'error' || status === 'changed') {
				checker.status(null)
				next = null
			}

			if (next === undefined) {
				const token = super.token()
				if (token && ! this.is_expired(token) ) {
					return token
				}
			}

			if (op === 'logout') {
				try {
					const redirect_uri = this.logout_send()
					this.redirect_to(redirect_uri)
				} catch (e) {
					if ( $mol_promise_like(e)) $mol_fail_hidden(e)
					$mol_fail_log(e)
				}
			}

			// Only clear token in local storage - do not logout on sso
			if (next === null && (! op || op === 'logout')) {
				return this.token_refresh(null)
			}

			let actual, error

			try {
				actual = this.update()
			} catch (e) {
				if ($mol_promise_like(e)) $mol_fail_hidden(e)
				error = e
			}

			if (! actual?.access_token || ! actual?.id_token) {
				this.token_refresh(null)
				if (error) $mol_fail_hidden(error)
				return null
			}

			this.token_refresh(actual.refresh_token ?? null)
			this.token_id(actual.id_token)

			return super.token(actual.access_token)
		}

		@ $mol_mem
		is_expired(token = super.token(), skew = this.time_skew) {
			this.time_skew = skew

			if (! token) return false

			const params = this.token_decode(token)
			const min_validity = this.min_validity()
			const end_time = $mol_wire_sync(new Date()).getTime()
			const expires_in = params?.exp ? params.exp * 1000 - end_time - skew - min_validity : 0

			return expires_in <= 0
		}
	}
}
