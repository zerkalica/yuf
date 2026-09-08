namespace $ {
	export let $yuf_wrap_regexp = /([\s,.;!?:]+)/

	export function $yuf_text_wrap(this: $, str: string, max = 30) {
		const result = [] as string[]

		for (const row of str.split('\n')) {
			if (row.length < max) {
				result.push(row)
				continue
			}

			let out = ''
			const parts = row.split(this.$yuf_wrap_regexp)
			for (let i = 0; i < parts.length; i += 2) {
				out += parts[i] + (parts[i + 1] ?? '')
				if (out.length > max) {
					result.push(out)
					out = ''
				}
			}

			if ( out ) result.push(out)
		}

		return result.join('\n')
	}

}
