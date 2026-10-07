namespace $ {
	export function $yuf_transport_authorized(res: $mol_fetch_response) {
		return res.code() !== 403 && res.code() !== 401
	}
}
