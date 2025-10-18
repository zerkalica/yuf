namespace $ {
	function $yuf_hex_encode_fallback(buf: Uint8Array<ArrayBuffer>) {
		  return Array.from(buf)
			.map(byte => byte.toString(16).padStart(2, '0'))
			.join('')
	}

	export function $yuf_hex_encode(buf: Uint8Array<ArrayBuffer>) {
		return (buf as unknown as { toHex(): string }).toHex()
	}

	if (! ('toHex' in Uint8Array.prototype ) ) $.$yuf_hex_encode = $yuf_hex_encode_fallback
}
