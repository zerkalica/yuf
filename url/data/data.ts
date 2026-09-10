namespace $ {
	export function $yuf_url_data_decode(url: string) {
		const [_, type, base64] = url?.match(/^data:(.*?)(?:;base64)?,(.*)/) ?? []
		if (! type || ! base64) throw new Error('Not a data url', { cause: { url }})
		const data = $mol_base64_decode(base64)

		return new Blob([ data ], { type })
	}

	export function $yuf_url_data_encode(blob: Blob) {
		const buffer = $mol_wire_sync(blob).bytes()
		const encoded = $mol_base64_encode(buffer)
		return `data:${blob.type};base64,${encoded}`
	}
}
