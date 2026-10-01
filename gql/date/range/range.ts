namespace $ {

	export function $yuf_gql_date_range(from_moment: $mol_time_moment | string | null, to_moment?: typeof from_moment) {
		const from = typeof from_moment === 'string' ? from_moment : from_moment?.toOffset( 'Z' ).toString()
		const to = typeof to_moment === 'string' ? to_moment : to_moment?.toOffset( 'Z' ).toString()
		return ! from && ! to ? '' : `{ ${! from ? '' : `_gte: "${from}"`} ${! to ? '' : `_lte: "${to}"`} }`
	}

}
