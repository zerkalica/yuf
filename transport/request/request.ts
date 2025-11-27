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

		async fetch_data( signal: AbortSignal ) {
			return fetch(new Request(this.native, { signal }))
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

			let timer = deadline ? setTimeout(() => destructor($mol_rest_code[$mol_rest_code['Request Timeout']]), deadline) : null

			return Object.assign( promise, { destructor } )
		}

	}

	const multipliers = [
		['ms', 1],
		['s', 1000],
		['m', 1000 * 60],
	] as const

}
