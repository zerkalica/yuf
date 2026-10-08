namespace $ {
	export function $yuf_data_nul<
		Sub extends $mol_data_value,
		Fallback extends undefined | ( ()=> ReturnType< Sub > )
	>( 
		sub: Sub,
		fallback?: Fallback
	) {

		return $mol_data_setup( ( val : Parameters<Sub>[0] | undefined | null) => {
			
			if( val === undefined || val === null) {
				type Res = Fallback extends undefined ? undefined | null : ReturnType< Extract< Fallback, ()=> any > >
				return fallback?.() as Res
			}
			
			return sub( val ) as ReturnType<Sub>
			
		} , { sub, fallback } )

	}
}
