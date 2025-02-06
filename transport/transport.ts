namespace $ {

	export type $yuf_transport_req = Omit<RequestInit, 'headers'> & {
		deadline?: number
		headers?: Record<string, string>
		auth_token?: string | null // null - auth disabled
		body_object?: object
	}

	export type $yuf_transport_error_response = {
		code?: number | null
		message?: string | null
		text?: string | null
	}

	export class $yuf_transport extends $mol_fetch {

		static base_url_localhost() {
			return ''
		}

		static is_localhost() {
			const loc = this.$.$mol_dom_context.location

			return loc.hostname === 'localhost'
		}

		@ $mol_mem
		static base_url(next?: string) {
			const url = this.$.$mol_state_local.value( '$yuf_transport.base_url()', next )
			if (url) return url

			if (this.is_localhost()) return this.base_url_localhost()

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

		@ $mol_mem_key
		static gql_query_template(query_url: string) {
			$mol_wire_solid()
			return this.get(query_url).text()
		}

		@ $mol_action
		static post_gql(
			path: string,
			params: Omit<$yuf_transport_req, 'body_object'> & {
				body_object: {
					query?: string
					query_url?: string
					variables?: Record<string, unknown>
				}
			}
		) {

			const query_url = params.body_object.query_url

			if (query_url) {
				params = {
					...params,
					body_object: {
						...params.body_object,
						query_url: undefined,
						query: this.gql_query_template(query_url)
					}
				}
			}

			if (! params.body_object?.query) throw new Error('No query in body_object')
	
			return this.post( path, params )
		}

		static token_key() {
			return 'kc_token'
		}

		@ $mol_mem
		static token( next? : string | null ): string | null | undefined {
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

			if (code === 403) return 'login' as const
			if (code === 401) return 'refresh' as const

			return null
		}

		@ $mol_mem
		static auth_wait(next?: null | 'login' | 'refresh') {
			// if (!this.token()) next = 'login'
			if (next !== undefined) {
				this.$.$mol_log3_rise({
					place: '$yuf_transport.auth_promise()',
					message: next ? 'awaiter' : 'null'
				})
			}

			if (! next) return null

			const promise = $mol_promise<typeof next | null>()

			return Object.assign(promise, { destructor: () => promise.done(null) }) as unknown as typeof next
		}

		static auth_refresh() {}

		static deadline() {
			return 300000
		}

		@ $mol_action
		static override success(path: RequestInfo, params: $yuf_transport_req) {
			let response
			let init: $yuf_transport_req | undefined
			let need
			const input = typeof path === 'string' && ! path.match(/^(\w+:)?\/\//) ? this.base_url() + path : path
			let error

			const auth_disabled = params.auth_token === null

			do {
				const headers_auth = auth_disabled ? undefined : this.headers_auth(params.auth_token)

				const headers: $yuf_transport_req['headers'] = {
					... this.headers_default(),
					... params.headers,
				}

				if (headers_auth) Object.assign(headers, headers_auth)

				if (!headers_auth && ! auth_disabled) {
					this.auth_wait('login')
				}

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

				need = this.auth_need(response)
				// if (need === 'refresh') this.auth_refresh()

				if (need) {
					this.auth_wait()
					this.auth_wait(need)
				}
			} while ( need )

			const response_json = this.responseToJson(response)
			const message = response_json?.message ?? 'Unknown'

			throw new $yuf_transport_error_auth(
				'Server error: ' + message,
				{ input, init, response: response_json },
				error ?? new Error(message)
			)
		}

		static responseToJson(res?: $mol_fetch_response | null): $yuf_transport_error_response | null {
			if (! res) return null

			let text

			try {
				text = res.text()
			} catch (e) {
				text = null
			}

			return {
				code: res.code(),
				text,
				message: res.message(),
			}
		}

		static override request(input: RequestInfo, init: $yuf_transport_req) {
			const res = super.request(input, init)
			const deadline = init.deadline ?? this.deadline()
			if (! deadline) return res

			const err_deadline = new $yuf_transport_error_deadline('Server timeout', {
				init,
				input,
				deadline,
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

	export class $yuf_transport_error extends $mol_error_mix<{
		input: RequestInfo
		init: $yuf_transport_req
		response?: $yuf_transport_error_response | null
		deadline?: number
	}> {}

	export class $yuf_transport_error_deadline extends $yuf_transport_error {}
	export class $yuf_transport_error_auth extends $yuf_transport_error {}

}
