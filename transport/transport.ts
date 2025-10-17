namespace $ {
	export type $yuf_transport_req_main = {
		deadline?: number
		headers?: Record<string, string | undefined | null>
		auth_token?: string | null // null - auth disabled
		auth_fails?: boolean // if 403 - return error, do not wait user input and retry fetch
		body_object?: object
		redirect?: 'follow' | 'manual' | 'error'
	}

	export type $yuf_transport_req =  RequestInit & $yuf_transport_req_main

	export type $yuf_transport_error_response = {
		input?: RequestInfo
		init?: $yuf_transport_req
		http_code?: number | null
		message?: string | null
		code?: string | null
		req_id?: string | null
		json?: unknown
		// [key: string]: number | string | null | undefined | Object
	}

	type Headers_extra = RequestInit['headers'] | Record<string, string | null | undefined > | null

	export class $yuf_transport_error extends $mol_error_mix<$yuf_transport_error_response> {
		req_id() {
			if ( this.cause.req_id) return this.cause.req_id

			const headers = this.cause.init?.headers
			const key = 'X-Request-ID'
			if (headers instanceof Headers) return headers.get(key)
			if (Array.isArray(headers)) return headers.find(([k ]) => k === key)?.[1] ?? null
			return headers?.[key] ?? null
		}
	}

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

		@ $mol_mem
		static session() { return this.$.$yuf_session._ }

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
		 * Default hears, merged to every request,
		 * Values can be overrided from call arguments.
		 */
		@ $mol_action
		static headers_default(): Record<string, string> {
			return {
				'X-Request-ID': $mol_guid(),
				'X-Client-ID': this.session().client_id(),
				'Content-Type': 'application/json',
			}
		}

		static get(path: string, params?: $yuf_transport_req) {
			return this.success(path, { ...params, method: 'GET' })
		}

		static head(path: string, params?: $yuf_transport_req) {
			return this.success(path, { ...params, method: 'HEAD' })
		}

		protected static headers_to_object(headers: RequestInit['headers'] | Record<string, string | null | undefined > | null) {
			if (! headers) return headers ?? {}

			const entries = headers instanceof Headers
				? headers.entries()
				: Array.isArray(headers) ? headers : null

			let result = (entries ? {} : headers) as Record<string, string | null | undefined >

			for (const [key, val] of entries ?? []) result[key] = val

			return result
		}

		static headers_merge( main_raw: Headers_extra, extra_raw?: typeof main_raw) {
			const result = { ... this.headers_to_object(main_raw), ...this.headers_to_object(extra_raw) }

			for (const key in result) {
				if (result[key] === null || result[key] === undefined) delete result[key]
			}

			return result as Record<string, string>
		}

		// custom range headers
		static range(path: string, raw?: $yuf_transport_req & { count_prefer?: 'exact' | 'planned' }) {
			const { count_prefer, ...params } = raw ?? {}
			const res = this.head(path, {
				...params,
				headers: this.headers_merge(params?.headers, {
					'Range-Unit': 'items',
					Prefer: `count=${count_prefer ?? 'exact'}`,
				}),
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

		static data<Result>(params: $yuf_transport_req & {
			input: RequestInfo,
			assert: (obj: any) => Result
		}) {
			let json
			let text

			const input = params.input
			const init = { ...params, input: undefined, assert: undefined } as $yuf_transport_req

			const res = this.success(input, init)

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
			return res.code() === 403 || res.code() === 401
		}

		/**
		 * Client throws timeout error if no response in dedline ms.
		 */
		static deadline() {
			return 300_000
		}

		static auth_fails() { return false }

		@ $mol_action
		static override success(path: RequestInfo, params: $yuf_transport_req ) {
			const input = typeof path === 'string' && ! path.match(/^(\w+:)?\/\//)
				? this.base_url() + path
				: path

			let response
			let init

			const body = params.body ?? (params.body_object ? JSON.stringify(params.body_object) : undefined)
			const headers_default = this.headers_merge(this.headers_default(), params.headers)

			let refresh = undefined as undefined | 'refresh'

			do {
				const auth_token = (params.auth_token || params.auth_token === null) && ! refresh
					? params.auth_token
					: this.session().token_cut(refresh)

				const headers = auth_token
					? this.headers_merge(headers_default, this.headers_auth(auth_token))
					: headers_default
	
				response = this.response(input, init = { ... params, body, headers })

				if ( response.status() === 'success' ) return response
				if (! this.auth_need(response) || refresh ) break
				refresh = 'refresh'
			} while( true )

			const response_json = this.response_json(response)
			const message = response_json?.message ?? 'Unknown'

			throw new $yuf_transport_error(
				message,
				{ input, init, ... response_json }
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

		static override request(input: RequestInfo, init?: $yuf_transport_req) {
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
