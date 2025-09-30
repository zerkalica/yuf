namespace $.$$ {
	
	const { rem, px, per } = $mol_style_unit
	
	$mol_style_define( $yuf_login_form, {
		Result: {
			padding: 0,
		},

		Foot: {
			flex: {
				direction: 'column',
			}
		},

		Submit: {
			flex: {
				grow: 1,
			},
			justifyContent: 'center',
			gap: $mol_gap.text,
		},
	} )
	
}
