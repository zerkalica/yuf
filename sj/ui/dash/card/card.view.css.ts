namespace $.$$ {
	
	$mol_style_define( $yuf_sj_ui_dash_card, {
		
		flex: {
			direction: 'column',
		},
		border: { radius: $mol_gap.round },
		background: {
			color: $mol_theme.card
		},
		padding: $mol_gap.block,

		Content: {
			flex: {
				wrap: 'wrap',
				shrink: 1,
				grow: 1,
			},
			gap: $mol_gap.block,
		},
		Title: {
			margin: 0,
		},
		
	} )
	
}
