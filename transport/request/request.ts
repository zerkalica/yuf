namespace $ {
	export type $yuf_transport_request_data_main = {
		deadline?: number
		headers?: RequestInit['headers'] | $yuf_header_rec
		auth_token?: string | null // null - auth disabled
		body_object?: object
	}

	export type $yuf_transport_request_data =  RequestInit & $yuf_transport_request_data_main

	export class $yuf_transport_request extends $mol_fetch_request {

		headers() {
			return this.native_actual().headers
		}

		id() {
			return this.headers().get('X-Request-ID')
		}

		client_id() {
			return this.headers().get('X-Client-ID')
		}

		deadline() {
			const str =this.headers().get('X-Request-Deadline') ?? ''

			let num = parseInt(str)

			if (! num || Number.isNaN(num)) return null
			const mul = multipliers.find(([k]) => str.endsWith(k))?.[1] || 1

			return num * mul
		}

		@ $mol_action
		override response() {
			this.native_actual()
			let native = $mol_wire_sync( this ).response_async()

			const code = native.status
			if (code === 403 || code === 401) {
				this.native_actual('new')
				native = $mol_wire_sync( this ).response_async()
			}

			return this.$.$yuf_transport_response.make({
				$: this.$,
				native,
				request: this
			})
		}

		native_actual(reset?: 'new') {
			return (this as $mol_type_writable<this>).native = this.native_grab(reset)
		}

		@ $mol_action
		native_grab(reset?: 'new') { return new Request('') }

		override success() {
			return super.success() as $yuf_transport_response
		}

		override response_async( ) {
			let promise = super.response_async()
			const deadline = this.deadline()
			if (! deadline) return promise
			let timer = null as null | NodeJS.Timeout

			const err_deadline = new Error($mol_rest_code[$mol_rest_code['Request Timeout']], { cause: { request: this} } )

			const timeout = new Promise<Response>((res, rej) => {
				timer = setTimeout(() => rej( err_deadline ), deadline)
			})

			return Object.assign( Promise.race([ promise, timeout ]), {
				destructor: ()=> {
					timer && clearTimeout(timer)
					promise.destructor()
				},
			} )
			
		}

	}

	const multipliers = [
		['ms', 1],
		['s', 1000],
		['m', 1000 * 60],
	] as const

}
