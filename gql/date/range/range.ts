namespace $ {

	export function $yuf_gql_date_range(from_moment: $mol_time_moment | null, to_moment: $mol_time_moment | null) {
		const from = from_moment?.toOffset( 'Z' ).toString()
		const to = to_moment?.toOffset( 'Z' ).toString()
		return ! from && ! to ? '' : `{ ${! from ? '' : `_gte: "${from}"`} ${! to ? '' : `_lte: "${to}"`} }`
	}

}
