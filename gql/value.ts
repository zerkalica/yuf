namespace $ {
	export function $yuf_gql_value(op: string, value?: string | null) {
		return value === null || value === undefined ? undefined : { [`_${op}`]: value }
	}
}
