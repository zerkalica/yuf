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

	export type $yuf_header_std_rec = {
		id?: string | null
		deadline?: number | null
		client_id?: string | null
		count_prefer?: 'exact' | 'planned' | null
		auth_token?: string | null // null - auth disabled
		content_type?: string | null
	}

	export function $yuf_header_std_make(init: $yuf_header_std_rec) {
		return {
			'Content-Type': ! init.content_type ? undefined : [init.content_type],
			'Authorization': init.auth_token ? `Bearer ${init.auth_token}` : init.auth_token,
			'Range-Unit': ! init.count_prefer ? undefined : 'items',
			'Prefer': ! init.count_prefer ? undefined : `count=${init.count_prefer}`,

			'X-Request-ID': init.id === undefined ? $mol_guid() : init.id,
			'X-Request-Deadline': typeof init.deadline === 'number' ? `${init.deadline.toFixed(0)}ms` : init.deadline,
			'X-Client-ID': init.client_id,
		}
	}

	export function $yuf_header_content_type_from_body(body: unknown) {
		if (body instanceof URLSearchParams) return 'application/x-www-form-urlencoded'
		if ( typeof body === 'string' ) return 'application/json'
		return null
	}

}
