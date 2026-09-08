namespace $ {
	export function $yuf_text_short(tag: string, prefix = '↪ ') {
		const parts = tag.split('/')
		if (parts.length < 2) return tag
		return prefix + (parts.at(-1) ?? '')
	}

}
