namespace $ {
	export function $yuf_header_range_parse(range_str: string) {
			const [all, from, to, total] = range_str?.match(/(?:(?:(\d+)\-(\d+))|(?:\*))\/((?:\d+)|(?:\*))$/) ?? []
			const count = ! total || total === '*' ? to : total

			if (count === '*') return 0

			if (! count?.match(/^\d+$/)) return null

			return Number(count)
	}
}
