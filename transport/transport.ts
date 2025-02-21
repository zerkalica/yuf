namespace $ {

	export type $yuf_transport_req = Omit<RequestInit, 'headers'> & {
		deadline?: number
		headers?: Record<string, string>
		auth_token?: string | null // null - auth disabled
		body_object?: object
		redirect?: 'follow' | 'manual' | 'error'
	}

	export type $yuf_transport_error_response = {
		input?: RequestInfo
		init?: $yuf_transport_req
		http_code?: number | null
		message?: string | null
		code?: string | null

		[key: string]: number | string | null | undefined | Object
	}

	export class $yuf_transport_error extends $mol_error_mix<$yuf_transport_error_response> {}

	export class $yuf_transport extends $mol_fetch {

		@ $mol_mem
		static base_url(next?: string) {
			const url = this.$.$mol_state_arg.value( 'api_url', next )
			if (url) return url

			return ''
		}

		static base_url_full() {
			const url = this.base_url()
			if (url.match(/^\w+\:/)) return url

			const loc = this.$.$mol_dom_context.location

			let normalized = url.replace(/^\/+/, '')
			if (normalized) normalized = '/' + normalized

			return `${loc.origin}${normalized}`
		}

		static base_url_ws() {
			return this.base_url_full().replace(/^http/, 'ws')
		}

		/**
		 * Access token local storage key.
		 */
		static token_key() {
			return 'kc_token'
		}

		/**
		 * Is user logged in.
		 *
		 * Token can be exists but obsolete.
		 */
		@ $mol_mem
		static loggedin() {
			return Boolean(this.token()) && ! this.logining()
		}

		/**
		 * Access token, placed in local storage by default.
		 */
		@ $mol_mem
		static token( next? : string | null ): string | null | undefined {
			if (next) this.logining(false)
			return this.$.$mol_state_local.value(this.token_key(), next) ?? undefined
		}

		/**
		 * Custom auth headers.
		 * 
		 * @param token access token
		 * @returns null if no token
		 */
		@ $mol_action
		static headers_auth(token: string): Record<string, string> | null {
			return {
				'Authorization': `Bearer ${token}`
			}
		}

		/**
		 * X-Client-ID header
		 */
		static client_id() {
			return `${this}`
		}

		/**
		 * Default hears, merged to every request,
		 * Values can be overrided from call arguments.
		 */
		@ $mol_action
		static headers_default(): Record<string, string> {
			return {
				'X-Request-ID': $mol_guid(),
				'X-Client-ID': this.client_id(),
				'Content-Type': 'application/json',
			}
		}

		static get(path: string, params?: $yuf_transport_req) {
			return this.success(path, { ...params, method: 'GET' })
		}

		static head(path: string, params?: $yuf_transport_req) {
			return this.success(path, { ...params, method: 'HEAD' })
		}

		// custom range headers
		static range(path: string, raw?: $yuf_transport_req & { count_prefer?: 'exact' | 'planned' }) {
			const { count_prefer, ...params } = raw ?? {}
			const res = this.head(path, {
				...params,
				headers: {
					...params?.headers,
					'Range-Unit': 'items',
					Prefer: `count=${count_prefer ?? 'exact'}`,
				},
			})

			const headers = res.headers()

			const range_str = headers.get('Content-Range')
			const [all, from, to, total] = range_str?.match(/(?:(?:(\d+)\-(\d+))|(?:\*))\/((?:\d+)|(?:\*))$/) ?? []
			const count = ! total || total === '*' ? to : total

			if (count === '*') return 0

			if (! count?.match(/^\d+$/)) {
				this.$.$mol_log3_warn({
					place: '$yuf_transport.count()',
					message: 'Cant get count of range',
					hint: 'check backend'
				})
				return undefined
			}

			return Number(count)

		}

		static put(path: string, params?: $yuf_transport_req) {
			return this.success(path, { ...params, method: 'PUT' })
		}

		static post(path: string, params?: $yuf_transport_req) {
			return this.success(path, { ...params, method: 'POST' })
		}

		static delete(path: string, params?: $yuf_transport_req) {
			return this.success(path, { ...params, method: 'DELETE' })
		}

		/**
		 * If response returns need auth (403 or 401 codes), routes to relogin or refresh.
		 *
		 * If return true - restart paused fetch
		 * If return false - throw error
		 */
		protected static auth_need(res: $mol_fetch_response) {
			if (res.code() === 403) return this.relogin()
			if (res.code() === 401) return this.refresh()

			return false
		}

		/**
		 * If obsolete access token, get it via refresh token.
		 */
		@ $mol_action
		static refresh() {
			throw new Error('Implement refresh')
			return true
		}

		/**
		 * If access token obsolete - pause response, ask user to login and retry fetch.
		 */
		@ $mol_action
		protected static relogin() {
			this.block()
			$mol_wire_sync(this).blocker()
			return true
		}

		@ $mol_action
		protected static block() {
			this.blocker(true)
			this.logining(true)
		}

		protected static _promise = null as null | $mol_promise_blocker<null>

		static blocker(next?: boolean) {
			if (next === false) {
				this._promise?.done(null)
				this._promise = null
			}

			if ( next && ! this._promise) {
				this._promise = new $mol_promise_blocker<null>()
			}

			return this._promise?.then(() => true) ?? null
		}

		@ $mol_mem
		static logining(next?: boolean) {
			this.blocker(next)
			return next ?? false
		}

		/**
		 * Client throws timeout error if no response in dedline ms.
		 */
		static deadline() {
			return 300000
		}

		@ $mol_action
		protected static token_cut() { return this.token() }

		@ $mol_action
		static override success(path: RequestInfo, params: $yuf_transport_req) {
			const input = typeof path === 'string' && ! path.match(/^(\w+:)?\/\//)
				? this.base_url() + path
				: path

			let error
			let response
			let init

			do {
				const headers: $yuf_transport_req['headers'] = {
					... this.headers_default(),
					... params.headers,
				}

				const token = params.auth_token === null ? null : ( params.auth_token ?? this.token_cut() )
				const headers_auth = token ? this.headers_auth(token) : null
				if (headers_auth) Object.assign(headers, headers_auth)

				const body = params.body ?? (params.body_object ? JSON.stringify(params.body_object) : undefined)

				init = { ...params, body, headers }

				try {
					if (params.auth_token !== null && ! token) this.relogin()
					response = this.response(input, init)
				} catch (e) {
					if ($mol_promise_like(e)) $mol_fail_hidden(e)
					error = e as Error
				}

				if (! response) break
				if ( response?.status() === 'success' ) return response
				if (params.auth_token === null) break
				if (! this.auth_need(response) ) break
			} while (true)

			const response_json = this.response_json(response)
			const message = response_json?.message ?? error?.message ?? 'Unknown'

			throw new $yuf_transport_error(
				'Server error: ' + message,
				{ input, init, ... response_json },
				error ?? new Error(message)
			)
		}

		static response_json(res?: $mol_fetch_response | null): $yuf_transport_error_response | null {
			if (! res) return null

			let http_code = res.code()
			let message = res.message()

			if (res.native.type === 'opaqueredirect' && ! http_code) {
				http_code = 302
				message = 'Redirect to: ' + res.native.url
			}

			let text

			try {
				text = res.text()
			} catch (e) {
				if ($mol_fail_catch(e)) text = null
			}

			let json

			if (text) {
				try {
					json = JSON.parse(text)
					text = null
				} catch (e) {
					json = null
					message += ', ' + text
				}
			}

			return { http_code, message, ...json }
		}

		static override request(input: RequestInfo, init: $yuf_transport_req) {
			const res = super.request(input, init)
			const deadline = init.deadline ?? this.deadline()
			if (! deadline) return res

			const err_deadline = new $yuf_transport_error('Client timeout', {
				init,
				input,
				http_code: 408,
				code: 'Timeout',
				deadline
			})

			const deadlined = Promise.race([
				new Promise<Awaited<typeof res>>(
					(res, rej) => setTimeout(() => rej( err_deadline ), deadline)
				),
				res
			])

			return Object.assign(deadlined,
				{ destructor: () => res.destructor() }
			)
		}
	}

}
