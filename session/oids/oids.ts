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
				str = `login-status-iframe.html${version ? '?' + new URLSearchParams({ version }) : ''}`
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

		callback_in_search() { return false }

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
			const { location, history } = this.$.$mol_dom_context
			const search = this.callback_in_search()
			const raw = search ? location.search : location.hash

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
				+ ( search ? new_part : location.search )
				+ ( search ? location.hash : new_part )

			if (next === null) {
                history.replaceState(history.state, '', new_url)
				return null
			}

			return params
		}

		@ $mol_mem
		protected token_id(next?: string | null) {
			if (next === null) super.token(null)

			return this.$.$mol_state_local.value(`${this.token_key()}_id`, next === '' ? null : next) || null
		}

		@ $mol_mem
		protected token_params() {
			const token = this.token()
			if (! token) return null

			return ($mol_jwt_decode(token).payload || null) as null | {
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

		realm_roles() { return this.token_params()?.realm_access?.roles ?? [] }

		resource_roles(resource: string) {
			return this.token_params()?.resource_access?.[resource || this.client_id()]?.roles ?? []
		}

		protected auth_headers() {
			const token = this.token()
			if (! token) return null

			return { Authorization: 'bearer ' + token }
		}

		@ $mol_mem
		user_profile() {
			const headers = this.auth_headers()
			if (! headers) return null

			return this.$.$mol_fetch.json(this.realm_url() + '/account', { headers }) as null | {
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

		@ $mol_mem
		user_info() {
			const headers = this.auth_headers()
			if (! headers) return null

			return this.$.$mol_fetch.json(this.endpoint('userinfo'), { headers }) as {
				sub: string
				[key: string]: any
			}
		}

		@ $mol_mem
		protected token_refresh(next?: string | null) {
			if (next === null) this.token_id(null)
			if (next || next === null) this.redirect_pair(null)

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
		redirect_pair(next?: [url: string, state: string] | null, refresh?: 'refresh') {
			if ( refresh ) next = [ this.redirect_uri(), $mol_guid() ]
			if (next === null) this.url_params(null)

			return this.$.$mol_state_local.value(`${this.token_key()}_redirect`, next)
		}

		scope() { return '' }

		flow() {
			return 'standard' as 'standard' | 'implicit' | 'hybrid'
		}
		@ $mol_mem
		protected action_query() {
			const [ redirect_uri, state ] = this.redirect_pair(null, 'refresh')!
			const client_id = this.client_id()
			const scope_suffix = this.scope()
			const scope = `openid${scope_suffix ? ` ${scope_suffix}` : ''}`
			const response_mode = this.callback_in_search() ? 'query' : 'fragment'
			const flow = this.flow()
			const response_type = flow === 'standard'
				? 'code'
				: flow === 'implicit' ? 'id_token token' : 'code id_token token'

			return new URLSearchParams({
				client_id,
				redirect_uri,
				state,
				response_mode,
				response_type,
				scope,
			})
		}

		@ $mol_mem
		account_url() {
			return this.realm_url() + '/account?' + new URLSearchParams({
				referrer: this.client_id(),
				referrer_uri: this.redirect_uri()
			})
		}

		login_url() { return this.endpoint('auth') + '?' + this.action_query() }
		register_url() { return this.endpoint('registrations') + '?' + this.action_query() }

		@ $mol_mem
		protected logout_params() {
			const id_token_hint = this.token_id()

			const params = {
				client_id: this.client_id(),
				post_logout_redirect_uri: this.logout_redirect_uri(),
			} as Record<string, string>

			if (id_token_hint) params.id_token_hint = id_token_hint

			return new URLSearchParams(params)
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
			const flow = this.flow()

			if (flow === 'implicit' && url_params?.access_token && url_params?.id_token) {
				return {
					access_token: url_params.access_token,
					id_token: url_params.id_token,
				}
			}

			const error = url_params?.error_description

			if (error) {
				throw new Error(error + `${url_params.error ? ` [${url_params.error}]` : ''}`, { cause: url_params })
			}

			const code = url_params?.code
			if (! refresh_token && ! code) return null

			const client_id = this.client_id()
			const url = this.endpoint('token')

			const grant_type = refresh_token ? 'refresh_token' : 'authorization_code'

			const redirect_pair = refresh_token ? null : this.redirect_pair()
			const [redirect_uri, state ] = redirect_pair ?? []

			if (redirect_uri && url_params?.state !== state) {
				throw new Error('Sso backurl is from another session')
			}

			const params = {
				code,
				grant_type,
				refresh_token,
				client_id,
				redirect_uri,
			} as Record<string, string>

			for (let key in params) {
				if (! params[key]) delete params[key]
			}

			return this.$.$mol_fetch.json(url, {
				method: 'POST',
				credentials: 'include',
				body: new URLSearchParams(params),
				headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
				}
			}) as {
				access_token?: string
				id_token?: string
				refresh_token?: string
			} | null
		}

		@ $mol_action
		redirect_to(redirect_uri?: string | null) {
			const loc = this.$.$mol_dom_context.location
			if (redirect_uri) loc.assign(redirect_uri)
			else loc.reload()
		}

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
				if (token) return token
			}

			if (op === 'logout') {
				try {
					const redirect_uri = this.logout_send()
					new $mol_after_tick(() => this.redirect_to(redirect_uri))
				} catch (e) {
					if ( $mol_promise_like(e)) $mol_fail_hidden(e)
					$mol_fail_log(e)
				}
			}

			// Only clear token in local storage - do not logout on sso
			if (next === null && (! op || op === 'logout')) {
				return this.token_refresh(null)
			}

			let actual

			try {
				actual = this.update()
			} catch (e) {
				if ( op === 'refresh' || $mol_promise_like(e)) $mol_fail_hidden(e)
				$mol_fail_log(e)
			}

			if (! actual?.access_token || ! actual?.id_token) return this.token_refresh(null)

			this.token_refresh(actual?.refresh_token ?? null)
			this.token_id(actual.id_token)
			return super.token(actual.access_token)
		}
	}
}
