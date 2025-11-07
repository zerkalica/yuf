namespace $ {
	export function $yuf_gql_response< Sub extends $mol_data_value >( sub : Sub ) {

		return $mol_data_setup( ( response : $mol_fetch_response ) => {
			try {
				const data = $yuf_gql_pick(response.json(), response.ok() ? null : response.message())
				return sub( data ) as ReturnType<Sub>
			} catch (e) {

				if (e instanceof Error) e = new $mol_error_mix(
					e.message, {
						... e.cause && typeof e.cause === 'object' && e.cause && 'key' in e.cause ? e.cause : null,
						response
					},
					e
				)
				$mol_fail_hidden(e)
			}
			
		} , sub )

	}
	
}
