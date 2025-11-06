namespace $ {
	export function $yuf_gql_response< Sub extends $mol_data_value >( sub : Sub ) {

		return $mol_data_setup( ( response : $mol_fetch_response ) => {
			const data = $yuf_gql_pick(response.json(), response.ok() ? null : response.message())
			
			return sub( data ) as ReturnType<Sub>
			
		} , sub )

	}
	
}
