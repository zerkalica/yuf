namespace $.$$ {
	
	const { rem, px, per } = $mol_style_unit
	
	$mol_style_define( $yuf_drag_item, {
		Item_drop:{
			'@': {
				mol_drop_status: {
					drag: {
						boxShadow: `0 -1px 0 0px ${ $mol_theme.focus }`,
					},
				},
			},
		},

	} )

}
