namespace $ {
	export function $yuf_gql_clean(where: Record<string, unknown>) {
		const result = {} as typeof where
		for (let key in where) {
			const val = where[key]
			if (Array.isArray(val) || (val && typeof val === 'object')) {
				result[key] = $yuf_gql_clean(val as typeof where)
			} else if (val !== undefined) result[key] = val
		}
		return result
	}
}
