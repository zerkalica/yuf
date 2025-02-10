namespace $ {

	export type $yuf_transport_req = Omit<RequestInit, 'headers'> & {
		deadline?: number
		headers?: Record<string, string>
		auth_token?: string | null // null - auth disabled
		body_object?: object
		redirect?: 'follow' | 'manual' | 'error'
	}

	export type $yuf_transport_error_response = {
		code?: number | null
		message?: string | null
		json?: unknown | null
	}

	export class $yuf_transport_error extends $mol_error_mix<{
		input: RequestInfo
		init: $yuf_transport_req
		response?: $yuf_transport_error_response | null
	}> {}

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

		static token_key() {
			return 'kc_token'
		}

		@ $mol_mem
		static token( next? : string | null ): string | null | undefined {
			if (next) this.auth_required(null)
			return this.$.$mol_state_local.value(this.token_key(), next) ?? undefined
		}

		// custom auth headers
		static headers_auth(token = this.token()): Record<string, string> | undefined {
			if (! token) return undefined

			return {
				'Authorization': `Bearer ${token}`
			}
		}

		@ $mol_action
		static headers_default(): Record<string, string> {
			return {
				'X-Request-ID': $mol_guid(),
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

		protected static auth_need(res: $mol_fetch_response) {
			const code = res.code()
			const status = res.status()
			if ( status === 'unknown' && res.native.type === 'opaqueredirect' ) {
				return 'login' as const
			}
			if (code === 302 ) return 'login' as const
			if (code === 403) return 'login' as const
			if (code === 401) return 'refresh' as const

			return null
		}

		protected static _promise = null as null | $mol_promise_blocker<null>

		static blocker_promise() { return this._promise?.then(() => true) }

		@ $mol_mem
		static auth_required(next?: null | 'login' | 'refresh') {
			if (next === null) {
				this._promise?.done(null)
				this._promise = null
			}

			if (next && ! this._promise) this._promise = new $mol_promise_blocker<null>()

			return next ?? null
		}

		static deadline() {
			return 300000
		}

		@ $mol_action
		static override success(path: RequestInfo, params: $yuf_transport_req) {
			let response
			let init: $yuf_transport_req | undefined

			const input = typeof path === 'string' && ! path.match(/^(\w+:)?\/\//)
				? this.base_url() + path
				: path

			let error

			const auth_disabled = params.auth_token === null

			do {
				const headers_auth = auth_disabled ? undefined : this.headers_auth(params.auth_token)

				const headers: $yuf_transport_req['headers'] = {
					... this.headers_default(),
					... params.headers,
				}

				if (headers_auth) Object.assign(headers, headers_auth)

				const body = params.body ?? (params.body_object ? JSON.stringify(params.body_object) : undefined)

				init = { ...params, body, headers }

				try {
					response = this.response(input, init)
				} catch (e) {
					if ($mol_promise_like(e)) $mol_fail_hidden(e)
					error = e as Error
					break
				}

				if ( response.status() === 'success' ) return response
				if (auth_disabled) break

				const need = this.auth_need(response)

				if (need) {
					this.auth_required(need)
					$mol_wire_sync(this).blocker_promise()
				}
			} while ( true )

			const response_json = this.response_json(response)
			const message = response_json?.message ?? error?.message ?? 'Unknown'

			throw new $yuf_transport_error(
				'Server error: ' + message,
				{ input, init, response: response_json },
				error ?? new Error(message)
			)
		}

		static response_json(res?: $mol_fetch_response | null): $yuf_transport_error_response | null {
			if (! res) return null

			let code = res.code()
			let message = res.message()

			if (res.native.type === 'opaqueredirect' && ! code) {
				code = 302
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

			return { code, json, message }
		}

		static override request(input: RequestInfo, init: $yuf_transport_req) {
			const res = super.request(input, init)
			const deadline = init.deadline ?? this.deadline()
			if (! deadline) return res

			const err_deadline = new $yuf_transport_error('Timeout', {
				init,
				input,
				response: { code: 408, message: 'Timeout ' + deadline },
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
