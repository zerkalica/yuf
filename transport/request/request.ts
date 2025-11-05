namespace $ {
	export type $yuf_transport_request_data_main = {
		deadline?: number
		headers?: RequestInit['headers'] | $yuf_header_rec
		auth_token?: string | null // null - auth disabled
		auth_fails?: boolean // if 403 - return error, do not wait user input and retry fetch
		body_object?: object
	}

	export type $yuf_transport_request_data =  RequestInit & $yuf_transport_request_data_main

	export class $yuf_transport_request extends $mol_fetch_request {
		readonly id = $mol_guid()

		deadline() { return 0 }

		@ $mol_action
		override response() {
			return this.$.$yuf_transport_response.make({
				$: this.$,
				native: $mol_wire_sync( this ).response_async(),
				request: this
			})
		}

		override success() {
			return super.success() as $yuf_transport_response
		}

		override response_async( ) {
			let promise = super.response_async()
			const deadline = this.deadline()
			if (! deadline) return promise
			let timer = null as null | NodeJS.Timeout

			const err_deadline = new Error('408 Request Timeout', { cause: this } )

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

}
