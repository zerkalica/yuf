namespace $ {
	export function $yuf_template_html(str: string, map_fn: (key: string) => string | number | boolean | null) {
		return str
			.replace(
				/(<select[^>]*>)([\s\S]*?)(<\/select>)/ig,

				(all, select_open: string, options: string, select_close: string) => {
					const key = select_open.match(/\bid\s*=\s*['"]([^'"]+)['"]/)?.[1] ?? null
					const val = key !== null ? map_fn(key) : null

					const options_selected = options.replace(
						/value\s*=\s*['"]([^'"]+)['"]/ig,
						(all, value) => {
							return `${all}${value === val ? ' selected' : ''}`
						}
					)

					return `${select_open}${options_selected}${select_close}`
				}
			)
			.replace(
				/\bid\s*=\s*["']([^"']+)["']/ig,

				(all, key: string) => {
					const val = map_fn(key)
					if (! val) return all
					return `${all} value="${val}"`
				}
			)

	}
}
