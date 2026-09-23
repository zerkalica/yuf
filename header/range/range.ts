namespace $ {
	export function $yuf_header_range_parse(val: string | Headers) {
		const range_str = typeof val === 'string' ? val : val.get('Content-Range')
		const [all, from, to, total] = range_str?.match(/(?:(?:(\d+)\-(\d+))|(?:\*))\/((?:\d+)|(?:\*))$/) ?? []
		const count = ! total || total === '*' ? to : total

		if (count === '*') return 0

		if (! count?.match(/^\d+$/)) return null

		return Number(count)
	}

	export function $yuf_header_range_make(count_prefer?: 'exact' | 'planned') {
		return {
			'Range-Unit': 'items',
			Prefer: `count=${count_prefer ?? 'exact'}`,
		}
	}
}
