namespace $.$$ {
	
	$mol_style_define( $yuf_karaoke_text, {
		flex: {
			direction: 'column',
		},
		font: {
			size: '2rem'
		},
		gap: '2rem',
		lineHeight: '2.25rem'
	} )

	$mol_style_define( $yuf_karaoke_text_group, {
		flex: {
			direction: 'column',
		},
	} )

	$mol_style_define( $yuf_karaoke_text_row, {
		padding: 0,

		justifyContent: 'center',
		whiteSpace: 'pre',
		
		Hilited: {
			whiteSpace: 'pre',
			color: $mol_theme.focus
		},
	} )
}
