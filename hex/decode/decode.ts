namespace $ {
	function $yuf_hex_decode_fallback(str: string) {
		const data = new Uint8Array(str.length / 2)
		for (let i = 0; i < data.length; i ++) {
			data[i] = parseInt(str.substring(i * 2, i * 2 + 2), 16)
		}

		return data
	}

	export function $yuf_hex_decode(str: string) {
		return (
			Uint8Array as typeof Uint8Array & { fromHex(str: string): Uint8Array<ArrayBuffer> }
		).fromHex(str)
	}

	if (! ('fromHex' in Uint8Array ) ) $.$yuf_hex_decode = $yuf_hex_decode_fallback
}
