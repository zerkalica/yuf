namespace $.$$ {
	
	$mol_style_define( $yuf_carousel_demo_card, {
		width: '10rem',
		boxShadow: `0 0 0 1px ${$mol_theme.line}`,
		padding: $mol_gap.block,
		color: $mol_theme.text,
		border: {
			radius: $mol_gap.round
		},

		gap: $mol_gap.space,
		flex: {
			direction: 'column',
		},

		Carousel: {
			flex: {
				grow: 0,
				basis: '5rem',
			},
		},
		
		
	} )
	
}
