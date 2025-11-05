namespace $ {
	export function $yuf_gql_mark({ query, variables }: { query: string, variables: Record<string, unknown>}) {
		let id_str = query.trim().match(/^(?:[\w\d_]+)\s+([\w\d\-]+)(?:.+)/s)?.[1] || ''

		for (const key of Object.keys(variables)) {
			if (key.includes('token')) continue
			const val = variables[key]
			if (val && typeof val === 'object') continue
			id_str += `~${key}=${val}`.slice(0, 60)
		}

		return id_str
	}
}
