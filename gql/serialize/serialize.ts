namespace $ {
	export function $yuf_gql_serialize(variables: {}) {
		return JSON.stringify(variables, null, '  ').replace(/"([^"]+)":\s/g, '$1: ')
	}
}
