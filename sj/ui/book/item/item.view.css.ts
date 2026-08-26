namespace $.$$ {
	
	$mol_style_define( $yuf_sj_ui_book_item, {
		
		padding: { top: $mol_gap.space, bottom: $mol_gap.space },
		border: {
			radius: $mol_gap.round,
		},
		overflow: 'hidden',
		flex: { direction: 'row', },

		Link: {
			border: {
				// @ts-ignore
				bottomRight: { radius: 0 },
				topRight: { radius: 0 },
			},
		},

		Buttons: {
			minWidth: '2.5rem',
			background: {
				color: $mol_theme.back,
			},
			border: {
				// @ts-ignore
				bottomRight: { radius: $mol_gap.round },
				topRight: { radius: $mol_gap.round },
			},
			alignSelf: 'stretch',
			flex: { direction: 'column' },
			gap: $mol_gap.space,
		}
		
	} )
	
}
