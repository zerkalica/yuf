namespace $ {

	export type $yuf_transport_req = Omit<RequestInit, 'headers'> & {
		deadline?: number
		headers?: Record<string, string | null>
		auth_token?: string | null // null - auth disabled
		auth_fails?: boolean // if 403 - return error, do not wait user input and retry fetch
		body_object?: object
		redirect?: 'follow' | 'manual' | 'error'
	}

	export type $yuf_transport_error_response = {
		input?: RequestInfo
		init?: $yuf_transport_req
		http_code?: number | null
		message?: string | null
		code?: string | null
		json?: unknown
		// [key: string]: number | string | null | undefined | Object
	}

	export class $yuf_transport_error extends $mol_error_mix<$yuf_transport_error_response> {}

	export class $yuf_transport_error_timeout extends $yuf_transport_error {
		constructor(cause: $yuf_transport_error_response) {
			super(`Timeout${cause.input ? ` ${cause.input}` : ''}`, {
				http_code: 408,
				code: 'TIMEOUT',
				...cause
			})
		}
	}

	export function $yuf_transport_pass(data: unknown) { return data }

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
		 * Is user logged in.
		 *
		 * Token can be exists but obsolete.
		 */
		@ $mol_mem
		static loggedin() {
			return Boolean(this.token()) && ! this.logining()
		}

		static session () { return this.$.$yuf_session._ }

		/**
		 * Access token, placed in local storage by default.
		 */
		@ $mol_mem
		static token( next? : string | null ) {
			if (next) this.logining(false)
			return this.session().token(next)
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
			return this.success2(path, { ...params, method: 'GET' })
		}

		static head(path: string, params?: $yuf_transport_req) {
			return this.success2(path, { ...params, method: 'HEAD' })
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
			return this.success2(path, { ...params, method: 'PUT' })
		}

		static post(path: string, params?: $yuf_transport_req) {
			return this.success2(path, { ...params, method: 'POST' })
		}

		static delete(path: string, params?: $yuf_transport_req) {
			return this.success2(path, { ...params, method: 'DELETE' })
		}

		static data<Result>(params: $yuf_transport_req & {
			input: RequestInfo,
			assert: (obj: any) => Result
		}) {
			let json
			let text

			const input = params.input
			const init = { ...params, input: undefined, assert: undefined } as $yuf_transport_req

			const res = this.success2(input, init)

			try {
				text = res.text()
				json = JSON.parse(text)
				return params.assert(json as any)
			} catch (e) {
				if ($mol_promise_like(e)) $mol_fail_hidden(e)

				throw new $yuf_transport_error(`Invalid ${json ? 'object' : 'json'} ${(e as Error).message}`, {
					input,
					init,
					code: json ? 'InvalidObject' : 'InvalidJson',
					message: (e as Error).message,
					json
				}, e as Error)
			}
		}

		@ $mol_mem_key
		static object_url_ref( path: string ) {
			return new this.$.$yuf_url_object(this.get( path ).blob())
		}

		static object_url(path: string) {
			return this.object_url_ref(path).url
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

		protected static init_normalize(params: $yuf_transport_req) {
			const token = params.auth_token === null ? null : ( params.auth_token ?? this.token_cut() )

			const headers = {
				... this.headers_default(),
				... ( token ? this.headers_auth(token) : null ),
				... params.headers,
			} as Record<string, string>

			for (const key of Object.keys(headers)) {
				if (headers[key] === null) delete headers[key]
			}

			const body = params.body ?? (params.body_object ? JSON.stringify(params.body_object) : undefined)

			return { ...params, body, headers }
		}

		@ $mol_action
		static override response( input: RequestInfo, init?: Omit<$yuf_transport_req, 'headers'> & { headers: Record<string, string> }) {
			return new $mol_fetch_response( $mol_wire_sync( this ).request( input , init) )
		}

		static auth_fails() { return false }

		@ $mol_action
		static success2(path: RequestInfo, params: $yuf_transport_req ) {
			const input = typeof path === 'string' && ! path.match(/^(\w+:)?\/\//)
				? this.base_url() + path
				: path

			let error
			let response
			let init

			do {
				const token = params.auth_token === null ? null : ( params.auth_token ?? this.token_cut() )
				init = this.init_normalize(params)
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
				if ( params.auth_fails || this.auth_fails() ) break
				if (! this.auth_need(response) ) break
			} while (true)

			const response_json = this.response_json(response)
			const message = response_json?.message ?? error?.message ?? 'Unknown'

			throw new $yuf_transport_error(
				message,
				{ input, init, ... response_json },
				error ?? new Error(message)
			)
		}

		static response_json(res?: $mol_fetch_response | null): $yuf_transport_error_response | null {
			if (! res) return null

			let text
			let data

			try {
				text = res.text()
				let json = JSON.parse(text) as Record<string, string | undefined> | null
				text = null

				if (! json) json = {}
				if (typeof json !== 'object') data = { code: 'Unknown', message: text }
				else data = this.code_from_json(json as {})

			} catch (e) {
				if ($mol_promise_like(e)) $mol_fail_hidden(e)
				data = { code: 'Unknown', message: text || 'Unknown', }
			}

			let http_message = res.message()
			let http_code = res.code()

			if (res.native.type === 'opaqueredirect' && ! http_code) {
				http_code = 302
				http_message = 'Redirect: ' + res.native.url
			}

			const message = `${data.message}${data.message ? ', ' : ''}${http_message}`
			
			return { ...data, message, http_code  }
		}

		static code_from_json(json: Record<string, string | undefined>) {
			const error_as_code = json.error && ! json.error.includes(' ') ? json.error : null
			const code = error_as_code || json.code || json.type || json.error || 'Unknown'
			const message = json.message || json.error || ''
			delete json.type
			delete json.code
			delete json.message
			delete json.error

			return { ...json, code, message }
		}

		static override request(input: RequestInfo, init?: $yuf_transport_req & { headers: Record<string, string> }) {
			const res = super.request(input, init)

			Object.assign(res, { init })
			const deadline = init?.deadline ?? this.deadline()
			if (! deadline) return res

			const err_deadline = new $yuf_transport_error_timeout({ init, input })

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
