namespace $ {

	export function $yuf_transport_request_native(path: RequestInfo, init?: $yuf_transport_request_init) {

		let url = typeof path === 'string' ? path : path.url
		const prev = typeof path === 'string' ? url : new Request(url, path)

		const req = new Request(prev, $yuf_transport_request_init_enrich(init))
		if (req.body && init?.body) {
			$yuf_pojo_known.set(req, init)
		}
		return req
	}

}
