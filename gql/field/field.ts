namespace $ {
	export function $yuf_gql_field(key: string, some: string) {
		return ! some ? '' : `{ ${key}: ${some} }`
	}
}
