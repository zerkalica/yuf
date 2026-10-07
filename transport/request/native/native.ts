namespace $ {
	export function $yuf_transport_request_native(path: RequestInfo, base?: $yuf_transport_request_init) {
		const init = ! base ? undefined : $yuf_transport_request_init_merge(base, { headers: $yuf_header_std(base) })
		const native = new Request(path, init)
		if (native.body && init?.body) $yuf_pojo_known.set(native, init)
		return native
	}
}
