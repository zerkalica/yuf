namespace $ {

	export type $yuf_header_rec = Record<string, string | readonly (string | null | undefined)[] | null | undefined >

	function assign_headers(target: Headers, rec?: $yuf_header_rec | null) {
		for (let k in rec) {
			const values = rec[k]

			for (const val of Array.isArray(values) ? values : [ values ]) {
				if (val === null || val === undefined) target.delete(k)
				else if (Array.isArray(values)) target.set(k, val)
				else target.append(k, val)
			}
		}

		return target
	}

	export function $yuf_header_normalize(headers: RequestInit['headers'] | $yuf_header_rec | null) {
		if (headers instanceof Headers) return headers
		if (Array.isArray(headers)) return new Headers(headers)
		return assign_headers(new Headers(), headers)
	}

	export function $yuf_header_merge( main_raw: RequestInit['headers'] | $yuf_header_rec, extra?: typeof main_raw) {
		const main = $yuf_header_normalize(main_raw)
		if ( ! ( extra instanceof Headers) && ! (Array.isArray(extra) ) ) {
			return assign_headers(new Headers(main), extra)
		}

		return new Headers([
			...main.entries(),
			... extra instanceof Headers ? extra.entries(): extra
		])
	}

}
