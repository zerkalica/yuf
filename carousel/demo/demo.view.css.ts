namespace $.$$ {
	
	$mol_style_define( $yuf_carousel_demo_card, {
		width: '10rem',
		minHeight: '9rem',
		boxShadow: `0 0 0 1px ${$mol_theme.line}`,
		color: $mol_theme.text,
		border: {
			radius: $mol_gap.round
		},

		background: {
			color: $mol_theme.card
		},

		flex: {
			direction: 'column',
		},
		justifyContent: 'space-between',

		Carousel: {
			padding: $mol_gap.space,
			background: {
				color: $mol_theme.card
			},
			border: {
				topLeft: { radius: $mol_gap.round },
				topRight: { radius: $mol_gap.round},
			},
			flex: {
				grow: 0,
				basis: '5rem',
			},
		},
		Body: {
			padding: $mol_gap.space,
			flex: {
				shrink: 1,
				grow: 111,
				direction: 'column',
			},
			justifyContent: 'end',
		},

		Buttons: {
			justifyContent: 'space-between',
		}

	} )
	
}
