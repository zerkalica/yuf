namespace $.$$ {
	
	$mol_style_define( $yuf_sj_ui_book_form, {

		padding: $mol_gap.space,
		gap: 0,
		border: {
			radius: $mol_gap.round
		},
		First: {
			gap: $mol_gap.block,
			flex: {
				grow: 1,
				wrap: 'wrap',
			}
		},

		Second: {
			gap: $mol_gap.block,
			justifyContent: 'end',
			flex: {
				grow: 1
			}

		},

		Foot: {
			padding: 0,
			gap: 0,
			justifyContent: 'end',
			alignItems: 'flex-end',
			flex: {
				grow: 1,
				wrap: 'nowrap',
			},
		},

	} )
	
}
