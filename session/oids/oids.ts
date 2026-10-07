namespace $ {
	const rec = $mol_data_record
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const str = $mol_data_string
	const num = $mol_data_number
	const bool = $mol_data_boolean
	const arr = $mol_data_array
	const dict = $mol_data_dict
	const vr = $mol_data_variant

	type Resource_role = 
		| 'view-realm'
		| 'manage-realm'
		| 'manage-users'
		| 'realm-admin'
		| 'query-realms'
		| 'view-users'
		| 'view-clients'
		| 'query-clients'
		| 'query-groups'
		| 'query-users'
		| 'manage-account'
		| 'manage-account-links'
		| 'view-profile'

	const Update_dto = rec({
		access_token: opt(nul(str)),
		id_token: opt(nul(str)),
		refresh_token: opt(nul(str)),
	})

	const Update_response = $yuf_session_oids_response_data(Update_dto)

	const Config_dto = rec({
		authorization_endpoint: str,
		token_endpoint: str,
		userinfo_endpoint: opt(nul(str)),
		check_session_iframe: opt(nul(str)),
		end_session_endpoint: opt(nul(str)),
	})

	const Config_response = $yuf_session_oids_response_data(Config_dto)

	export type $yuf_session_oids_endpoint = 'account'
		| 'auth' | 'token' | 'logout' | 'registrations' | 'userinfo' | 'status' | 'step1'
		| 'users' | 'metadata' | 'roles' | 'groups' | 'partialImport'

	export type $yuf_session_oids_params = Record<string, string | number | null | undefined> | null

	/**
	 * original: https://github.com/keycloak/keycloak-js/blob/main/lib/keycloak.js
	 */
	export class $yuf_session_oids extends $yuf_session {
		auth_server_url() {
			return `/${this.client_id()}-keycloak`
		}

		realm() { return 'mssc' }

		protected realm_url(prefix = '') {
			return `${this.auth_server_url().replace(/\/+$/, '')}${prefix ? `/${prefix}` : ''}/realms/${encodeURIComponent(this.realm())}`
		}

		endpoint(k: $yuf_session_oids_endpoint, params?: $yuf_session_oids_params) {
			const query = ! params ? '' : '?' + this.search_params(params).toString()
			if (k === 'users' || k === 'roles' || k === 'groups' || k === 'partialImport' || k === 'metadata') {
				return `${this.realm_url('admin')}/${k === 'metadata' ? `users/profile/${k}` : k}${query}`
			}

			let url = this.config_value(k)

			if (url && url.startsWith('/') && ! this.realm_url().startsWith('/')) {
				const origin = new URL(this.realm_url()).origin
				url = origin + url
			}

			if (url) return url + query

			let str = k as string
			if (k === 'step1') str = '3p-cookies/step1.html'

			if (k === 'status') {
				const version = this.status_iframe_version()
				str = `login-status-iframe.html${version ? '?' + this.search_params({ version }) : ''}`
			}

			if (k !== 'account') str = `protocol/openid-connect/${str}`

			return `${this.realm_url()}/${str}${query}`
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
			const response = this.response(`${this.realm_url()}/.well-known/openid-configuration`, { auth_token: null })

			return Config_response(response)
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
			return `${this.client_id()} ${this.token_params()?.payload?.sid ?? ''}`
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

		session_error() { return this.checker()?.status() ?? null }

		@ $mol_action
		protected callback_parts() {
			const { location } = this.$.$mol_dom_context
			const use_query = this.use_query()

			const known = this.params_hybrid()
			let params = null as null | Partial<Record<typeof known[number], string | null | undefined>>

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
					if (! params) params = {}
					params[name] = param_raw.slice(name.length + 1)
					continue
				}

				unknown.push(param_raw)
			}

			let clean_url = href.slice(0, from_index) + unknown.join('&') + href.slice(to_index)
			clean_url = clean_url.replace(/[\#\?]$/, '')

			return { params, clean_url }
		}

		protected redirect_uri() { return this.callback_parts().clean_url }

		@ $mol_mem
		protected token_id(next?: string | null) {
			if (next === null) super.token(null)
			if (next === null) this.redirect_params(null)
			if (next === null || next) this.redirect_to(this.redirect_uri(), 'history')

			return this.$.$mol_state_local.value(`${this.token_key()}_id`, next === '' ? null : next) || null
		}

		@ $mol_mem
		protected token_params() {
			const token = super.token()
			return token ? this.$.$yuf_session_oids_token_data(token) : null
		}

		roles() { return this.token_params()?.payload?.realm_access?.roles ?? [] }
		groups() {
			const params = this.token_params()?.payload
			return params?.groups ?? params?.group_membership ?? []
		}

		resource_roles(resource: 'realm-management' | 'account') {
			return (this.token_params()?.payload?.resource_access?.[resource || this.client_id()]?.roles ?? []) as readonly Resource_role[]
		}

		has_role(resource: 'realm-management' | 'account', roles: readonly Resource_role[]) {
			return this.resource_roles(resource).some(r => roles.includes(r))
		}

		can_users_view() { return this.has_role('realm-management', ['view-users', 'manage-users', 'realm-admin', 'query-users']) }
		can_users_logout() { return this.has_role('realm-management', ['manage-users', 'realm-admin', 'manage-realm']) }

		@ $mol_mem
		users() { return this.$.$yuf_session_oids_user_store.make({ session: () => this }) }

		@ $mol_mem
		override user_id() {
			const params = this.token_params()
			if (! params) return ''
			let id = params.payload?.sub
			if (id) return id

			const response = this.response(this.endpoint('account'))
			const data = ! response ? null : $yuf_session_oids_user_model_response(response)
			id = data?.id ?? ''
			if (! this.can_users_view()) this.users().preloaded(id, data)

			return id
		}

		@ $mol_mem
		protected token_refresh(next?: string | null) {
			if (next === null) this.token_id(null)
			return this.$.$mol_state_local.value(`${this.token_key()}_refresh`, next === '' ? null : next) || null
		}

		logout_redirect_uri() { return this.redirect_uri() }

		override token_key() { return `${this.realm_url()}_${this.client_id()}_token` }

		@ $mol_mem
		protected redirect_params(next?: [ state: string, nonce?: string, verifier?: string ] | null, refresh?: 'refresh') {
			if ( refresh === 'refresh') next = [
				$mol_guid(36),
				this.use_nonse() ? $mol_guid(36) : undefined,
				this.pkce_method() ? $mol_guid(96) : undefined,
			]

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
		protected action_params() {
			const [ state, nonce, code_verifier ] = this.redirect_params(null, 'refresh')!
			const scope = this.scope()
			const flow = this.flow()

			return {
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
			}
		}

		@ $mol_mem
		account_url() {
			return this.endpoint('account', {
				referrer: this.client_id(),
				referrer_uri: this.redirect_uri()
			})
		}

		login_url() { return this.endpoint('auth', this.action_params()) }
		register_url() { return this.endpoint('registrations', this.action_params()) }

		logout_params() {
			return {
				client_id: this.client_id(),
				id_token_hint: this.token_id(),
				post_logout_redirect_uri: this.logout_redirect_uri(),
			}
		}

		@ $mol_mem
		logout_url() { return this.endpoint('logout', this.logout_params()) }

		response(url: string, init?: $yuf_transport_request_init) { return this.$.$yuf_transport.response(url, init, this) }

		logout_use_post() { return true }

		@ $mol_action
		protected logout_send() {
			const url = this.endpoint('logout')
			const params = this.search_params(this.logout_params())

			const doc = this.$.$mol_dom_context.document
			const form = doc.createElement('form')
			form.setAttribute('method', 'POST')
			form.setAttribute('action', url)
			form.style.display = 'none'

			for (const [name, value] of params) {
				const field = doc.createElement('input')
				field.setAttribute('type', 'hidden')
				field.setAttribute('name', name)
				field.setAttribute('value', value)
				form.appendChild(field)
			}
			doc.body.appendChild(form)
			form.submit()

			return null
		}

		@ $mol_action
		override logout() {
			const redirect_uri = this.logout_use_post() ? this.logout_send() : this.login_url()
			super.logout()
			if (redirect_uri) this.redirect_to(redirect_uri)
		}

		@ $mol_action
		protected time_cut() { return new Date().getTime() }

		@ $mol_action
		protected update() {
			const refresh_token = this.token_refresh()
			const callback_params = refresh_token ? null : this.callback_parts().params
			const [ state, nonce, code_verifier ] = refresh_token ? [] : this.redirect_params() ?? []
			if (state && state !== callback_params?.state) throw new Error('Wrong state id', { cause: { callback_params, state } })
			const error_message = `${callback_params?.error_description ?? ''}${
				callback_params?.error ? ` ${callback_params?.error}` : ''}`

			if (error_message) {
				throw new Error(error_message, { cause: callback_params })
			}

			const start_time = this.time_cut()

			let result = null as null | typeof Update_dto.Value

			const url = this.endpoint('token')
			const flow = this.flow()

			if (flow === 'implicit' && callback_params?.access_token && callback_params?.id_token) {
				result = {
					access_token: callback_params.access_token,
					id_token: callback_params.id_token,
				}
			} else if ( callback_params?.code || refresh_token ) {
				const body = this.search_params({
					code: callback_params?.code,
					grant_type: refresh_token ? 'refresh_token' : 'authorization_code',
					refresh_token,
					client_id: this.client_id(),
					redirect_uri: refresh_token ? undefined : this.redirect_uri(),
					code_verifier,
				})

				const response = this.response(url, { credentials: 'include', body, auth_token: null, id: null, client_id: null })

				result = Update_response(response)
			}

			if (! result ) return null

			const id_token = nonce && result.id_token ? this.$.$yuf_session_oids_token_data(result.id_token)?.payload : null

			if (id_token && id_token.nonce !== nonce) {
				throw new Error('Invalid nonce', { cause: {
					nonce: nonce?.slice(0, 3),
					server_nonce: id_token.nonce?.slice(0, 3)
				} })
			}

			const end_time = this.time_cut()
			const average_time = (start_time + end_time) / 2

			if ( result?.access_token && this.expires_in(result.access_token, average_time) <= 0) {
				throw new Error('Auth token expired', { cause: {
					access_token: result.access_token?.slice(0, 3),
					average_time,
				} })
			}

			return result
		}

		@ $mol_action
		redirect_to(url?: string | null, history?: 'history') {
			const loc = this.$.$mol_dom_context.location
			if (! history) new this.$.$mol_after_frame(() => url ? loc.assign(url) : loc.reload())
			else if (url && loc.href !== url) this.$.$mol_state_arg.href(url)
			return null
		}

		min_validity() { return 5000 }

		@ $mol_mem
		override token(next?: string | null, op?: 'refresh') {
			// after redirect from sso url params not empty, but nulled in token_id(null)
			const callback_params = this.callback_parts().params
			const token = super.token()

			try {
				const timer = this.expires_timer()
				if ( ! callback_params && next === undefined && token && ! this.session_error() && timer ) {
					return token
				}

				const actual = next === undefined || op === 'refresh' ? this.update() : null

				this.$.$mol_log3_rise({
					place: '$yuf_session_oids.token()',
					message: 'changes',
					next,
					op,
					token: token?.slice(0, 5),
					session_error: ! token ? null : this.session_error(),
				})

				this.token_refresh(actual?.refresh_token ?? null)
				this.token_id(actual?.id_token ?? null)
				const next_token = super.token(actual?.access_token ?? null)

				this.expires_timer(null)

				return next_token
			} catch (e) {
				if ($mol_promise_like(e) ) $mol_fail_hidden(e)
				this.token_refresh(null)
				// Show any error on page reload if keycloak params exists in url (after redirect from sso)
				if (callback_params) $mol_fail_hidden(e)

				const code = e instanceof Error ? e.message : null

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
		protected expires_timer(reset?: null) {
			const token = super.token()
			if (! token) return null
			if (reset === null) return null
			const expires_in = this.expires_in(token)
			if (expires_in <= 0) return null
			return new $mol_after_timeout(expires_in, () => this.expires_timer(null))
		}

		@ $mol_action
		protected expires_in(token?: string, average_time?: number) {
			const params = token ? this.$.$yuf_session_oids_token_data(token)?.payload : null

			if (! params) return 0

			if (params.iat && average_time) {
				this.time_skew = Math.floor(average_time - params.iat * 1000)
			}

			const min_validity = this.min_validity()
			const end_time = this.time_cut()
			return params.exp ? params.exp * 1000 - end_time - this.time_skew - min_validity : 0
		}
	}
}
