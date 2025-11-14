namespace $ {
	export class $yuf_transport_request extends $mol_fetch_request {

		header(key: string) {
			return this.native?.headers?.get(key) ?? null
		}

		id() { return this.header('X-Request-ID') }

		client_id() { return this.header('X-Client-ID') }

		deadline() {
			const str = this.header('X-Request-Deadline') ?? ''

			let num = parseInt(str)

			if (! num || Number.isNaN(num)) return null
			const mul = multipliers.find(([k]) => str.endsWith(k))?.[1] || 1

			return num * mul
		}

		@ $mol_action
		native_grab(reset?: 'new') { return new Request('') }

		need_refresh_token(response: Response) {
			const code = response.status

			return code === 403 || code === 401
		}

		async fetch_data( signal: AbortSignal ) {
			let refresh = undefined as undefined | 'new'
			do {
				let native = await $mol_wire_async(this).native_grab(refresh)
				// Save in this.native for debugging
				;(this as $mol_type_writable<this>).native = native
				const response = signal.aborted ? new Response() : await fetch( new Request(native, { signal }) )

				if (refresh || ! this.need_refresh_token(response)) return response
				refresh = 'new'
			} while( true )
		}

		override response_async() {
			let done = false
			const controller = new AbortController()
			const promise = this.fetch_data(controller.signal).finally( ()=> {
				done = true
			} )

			const deadline = this.deadline()
			const destructor = (reason?: string)=> {
				timer && clearTimeout(timer)
				if( !done && !controller.signal.aborted ) controller.abort(reason)
			}

			let timer = deadline ? setTimeout(() => destructor($mol_rest_code[$mol_rest_code['Request Timeout']])) : null

			return Object.assign( promise, { destructor } )
		}

	}

	const multipliers = [
		['ms', 1],
		['s', 1000],
		['m', 1000 * 60],
	] as const

}
