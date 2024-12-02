namespace $ {
	const { rem, px, em, per, vw, vh, s } = $mol_style_unit
	const { calc, hsla, vary, steps } = $mol_style_func

	$mol_style_define( $yuf_chess_piece , {
		color: 'white',
		'@': {
			yuf_chess_piece_color: {
				b: {
					color: 'black',
				},
			},
		}
	} )

}
