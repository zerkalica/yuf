namespace $.$$ {
	
	$mol_style_define( $yuf_keyboard_card, {
		
		'--yuf_keyboard_button_width': '2.5rem',
		'--yuf_keyboard_button_height': 'var(--yuf_keyboard_button_width)',

		flex: {
			direction: 'column',
			wrap: 'wrap',
		},
		background: {
			color: $mol_theme.card,
		},
		border: {
			radius: $mol_gap.round,
		},
		
	} )

	$mol_style_define( $yuf_keyboard_row, {
	})	

	$mol_style_define( $yuf_keyboard_cell, {
		
		'--yuf_keyboard_cell_width_mul': '1',

		cursor: 'pointer',
		
		touchAction: 'none',
		transition: 'none',

		background: {
			color: $mol_theme.card,
		},
		':hover': {
			background: {
				color: $mol_theme.hover,
			},
		},
		
		align: {
			items: 'center',
		},
		
		justify: {
			content: 'center',
		},
		
		box: {
			shadow: [[0, 0, 0, `1px`, $mol_theme.line ]],
		},
		
		// @ts-ignore
		width: `calc( var(--yuf_keyboard_button_width) * var(--yuf_keyboard_cell_width_mul) )`,
		height: $mol_style_func.vary('--yuf_keyboard_button_height'),
		
		border: {
			radius: $mol_gap.round,
		},
		
	} )
	
}
