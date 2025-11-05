namespace $ {
	export function $yuf_gql_assert< Sub extends $mol_data_value >( sub : Sub ) {

		return $mol_data_setup( ( val : Parameters<Sub>[0] | null ) => {
			
			const data = $yuf_gql_pick(val)
			
			return sub( data ) as ReturnType<Sub>
			
		} , sub )

	}
	
}
