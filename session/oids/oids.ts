namespace $ {

	function $yuf_session_oids_error(obj: unknown) {
		if (obj instanceof Error) obj = obj.cause
		if (! obj || ! ( typeof obj === 'object') ) return null
		if (! (obj as { error?: string }).error) return null

		return obj as {
			error:
				| 'invalid_grant'
				| 'invalid_client'
				| 'unauthorized_client'
				| 'invalid_scope'
				| 'unsupported_grant_type'
				| 'access_denied'
				| 'invalid_token'
				| 'insufficient_scope'
			error_description?: string
		}
	}

	export class $yuf_session_oids extends $yuf_session {
		@ $mol_memo.field
		static get _() { return new this() }

		auth_server_url() {
			return `/${this.client_id()}-keycloak`
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
				return this.json(url) as null | {
					authorization_endpoint: string
					token_endpoint: string
					userinfo_endpoint?: string
					check_session_iframe?: string
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
			return auth_url.startsWith('/') ? this.$.$mol_dom.location.origin : new URL(auth_url).origin
		}

		protected checker_message() {
			const sid = $mol_wire_probe(() => this.token_params())?.sid
			return `${this.client_id()}${sid ? ` ${sid}` : ''}`
		}

		checker_enabled() { return true }

		@ $mol_mem
		protected checker() {
			if (! this.checker_enabled()) return null

			return this.$.$yuf_session_oids_checker.make({
				src: () => this.endpoint('status'),
				origin: () => this.checker_origin(),
				message: () => this.checker_message()
			})
		}

		@ $mol_action
		protected callback_parts(next?: null) {
			const { location } = this.$.$mol_dom_context
			const use_query = this.use_query()

			const known = this.params_hybrid()
			const params = {} as Record<typeof known[number], string | null | undefined>

			const href = location.href
			const query_index = href.indexOf('?')
			const fragment_index = href.indexOf('#')

			let from_index = use_query ? query_index : fragment_index
			from_index++
			if (from_index === 0) from_index = href.length

			let to_index = use_query ? fragment_index : query_index
			if (to_index < from_index) to_index = href.length

			const pairs = href.slice(from_index, to_index).split('&')
			const unknown = [] as string[]

			for (const param_raw of pairs) {
				const name = known.find(key => param_raw.startsWith(key + '='))

				if ( name ) {
					params[name] = param_raw.slice(name.length + 1)
					continue
				}

				unknown.push(param_raw)
			}

			let clean_url = href.slice(0, from_index) + unknown.join('&') + href.slice(to_index)
			clean_url = clean_url.replace(/[\#\?]$/, '')

			if (next === null) {
				if (location.href !== clean_url) {
					this.redirect_to(clean_url, 'history')
				}

				return { params: null , clean_url }
			}

			return { params, clean_url }
		}

		protected redirect_uri() { return this.callback_parts().clean_url }
		protected callback_params() { return this.callback_parts().params }

		@ $mol_mem
		protected token_id(next?: string | null) {
			if (next === null) super.token(null)
			if (next || next === null) {
				$mol_wire_probe(() => this.checker())?.changed(false)
				this.redirect_params(null)
			}

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

			return this.json(this.realm_url() + '/account', { headers, credentials: 'include' }) as null | {
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

		override user_id() { return this.user_profile()?.id ?? null }
		user_name() { return this.user_profile()?.username ?? '' }

		@ $mol_mem
		protected user_info() {
			const headers = this.auth_headers()
			if (! headers) return null

			return this.json(this.endpoint('userinfo'), { headers, credentials: 'include' }) as {
				sub: string
				[key: string]: any
			}
		}

		@ $mol_mem
		protected token_refresh(next?: string | null) {
			if (next === null) this.token_id(null)
			return this.$.$mol_state_local.value(`${this.token_key()}_refresh`, next === '' ? null : next) || null
		}


		logout_redirect_uri() {
			return this.redirect_uri()
		}

		@ $mol_mem
		redirect_params(next?: [ state: string, nonce?: string, verifier?: string ] | null, refresh?: 'refresh') {
			if ( refresh ) next = [
				$mol_guid(36),
				this.use_nonse() ? $mol_guid(36) : undefined,
				this.pkce_method() ? $mol_guid(96) : undefined,
			]

			if (next === null) this.callback_parts(null)

			return this.$.$mol_state_local.value(`${this.token_key()}_redirect`, next)
		}

		scope() { return null as string | null }

		flow() { return 'standard' as 'standard' | 'implicit' | 'hybrid' }

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
		pkce_method() { return null as null | 'SHA-256' }

		@ $mol_action
		pkce_generate(code: string) {
			const algo = this.pkce_method()
			if (! algo) return null

			const data = $mol_wire_sync(this.$).$mol_charset_encode(code)
			const hash_buf = $mol_wire_sync(this.$.$mol_crypto_native.subtle).digest( algo, data )

			return this.$.$mol_base64_url_encode(new Uint8Array(hash_buf))
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
			const [ state, nonce, code_verifier ] = this.redirect_params(null, 'refresh')!
			const scope = this.scope()
			const flow = this.flow()

			return this.search_params({
				client_id: this.client_id(),
				redirect_uri: this.redirect_uri(),
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

		login_url() {
			return this.endpoint('auth') + '?' + this.action_query()
		}
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

		response(url: string, params?: RequestInit) {
			const headers = { ... params?.headers } as Record<string, string>
			if (params?.body instanceof URLSearchParams) {
				headers['Content-type'] = 'application/x-www-form-urlencoded'
			}

			return this.$.$mol_fetch.response(url, { ...params, method: params?.body ? 'POST' : 'GET', headers })
		}

		json(url: string, params?: RequestInit) {
			const response = this.response(url, params)
			const text = response.text()

			let result
			try {
				result = JSON.parse(text)
			} catch (e) {
				$mol_fail_hidden(new Error(response.message() + ': ' + (e as Error).message, { cause: e }))
			}

			if (response.code() >= 400) {
				const error = $yuf_session_oids_error(result)

				const error_message = `${error?.error_description ?? ''}${
					error?.error ? ` ${error?.error}` : ''}` || response.message()

				throw new Error(error_message, { cause: error || response })
			}

			return result
		}

		@ $mol_action
		logout_send() {
			const url = this.endpoint('logout')

			const res = this.token_id() ? this.response(url, { body: this.logout_params() } ) : null

			return res?.native.redirected ? res.native.url : null
		}

		@ $mol_action
		time_cut() { return new Date().getTime() }

		@ $mol_action
		update() {
			const refresh_token = this.token_refresh()
			const callback_params = refresh_token ? null  : this.callback_params()
			const error_message = `${callback_params?.error_description ?? ''}${callback_params?.error ? ` ${callback_params?.error}` : ''}`

			if (error_message) {
				throw new Error(error_message, { cause: callback_params })
			}

			const start_time = this.time_cut()

			const [ state, nonce, code_verifier ] = refresh_token ? [] : this.redirect_params() ?? []

			if (callback_params?.state && callback_params.state !== state) {
				throw new Error('Invalid state in backurl', { cause: {
					stored_state: state,
					callback_params,
				}})
			}

			let result = null as {
				access_token?: string
				id_token?: string
				refresh_token?: string
			} | null

			const url = this.endpoint('token')
			const flow = this.flow()

			if (flow === 'implicit' && callback_params?.access_token && callback_params?.id_token) {
				result = {
					access_token: callback_params.access_token,
					id_token: callback_params.id_token,
				}
			} else if ( ! callback_params?.code && ! refresh_token ) return null

			const body = this.search_params({
				code: callback_params?.code,
				grant_type: refresh_token ? 'refresh_token' : 'authorization_code',
				refresh_token,
				client_id: this.client_id(),
				redirect_uri: refresh_token ? undefined : this.redirect_uri(),
				code_verifier,
			})

			result = this.json(url, { credentials: 'include', body })

			const id_token = nonce && result?.id_token ? this.token_decode(result.id_token) : null

			if (id_token && id_token.nonce !== nonce) {
				throw new Error('Invalid nonce', { cause: {
					nonce: nonce?.slice(0, 3),
					server_nonce: id_token.nonce?.slice(0, 3)
				} })
			}

			const end_time = this.time_cut()
			const average_time = (start_time + end_time) / 2

			if ( result?.access_token && this.is_expired(result.access_token, average_time) ) {
				throw new Error('Auth token expired', { cause: {
					access_token: result.access_token?.slice(0, 3),
					average_time,
				} })
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

		@ $mol_mem
		override token(next?: string | null, op?: 'refresh' | 'logout') {
			try {
				if (op === 'logout') {
					const redirect_uri = this.logout_send()
					this.redirect_to(redirect_uri)
				}

				if (next === undefined) {
					const token = super.token()
					if (! this.checker()?.changed() && token && ! this.is_expired(token) ) return token
				}
			} catch (e) {
				if ( $mol_promise_like(e)) $mol_fail_hidden(e)
				$mol_fail_log(e)
			}
			// after redirect from sso url params not empty, but nulled in token_id(null)
			const callback_params = this.callback_params()

			try {
				const actual = next === undefined || op === 'refresh' ? this.update() : null

				this.token_refresh(actual?.refresh_token ?? null)
				this.token_id(actual?.id_token ?? null)

				return super.token(actual?.access_token ?? null)
			} catch (e) {
				if ($mol_promise_like(e) ) $mol_fail_hidden(e)
				this.token_refresh(null)
				// Show any error on page reload if keycloak params exists in url (after redirect from sso)
				if (callback_params) $mol_fail_hidden(e)

				const code = $yuf_session_oids_error(e)?.error

				if (code === 'invalid_grant' || code === 'unauthorized_client' || code === 'invalid_token') {
					// If token obsolete on page reload - do not show error on page - just clear token and logout
					$mol_fail_log(e)
					return null
				}

				$mol_fail_hidden(e)
			}
		}

		protected time_skew = 0

		@ $mol_mem
		is_expired(token = super.token(), average_time?: number) {
			const params = token ? this.token_decode(token) : null
			if (! params) return false

			if (params.iat && average_time) {
				this.time_skew = Math.floor(average_time - params.iat * 1000)
			}
			const min_validity = this.min_validity()
			const end_time = this.time_cut()
			const expires_in = params.exp ? params.exp * 1000 - end_time - this.time_skew - min_validity : 0

			return expires_in <= 0
		}
	}
}
