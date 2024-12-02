namespace $ {
	const { rem, px, em, per, vw, vh, s } = $mol_style_unit
	const { calc, hsla, vary, steps } = $mol_style_func

	$mol_style_define( $yuf_chess_cell , {
		minWidth: px(40),
		minHeight: px(40),
		// aspectRatio: 1,
		background: {
			color: vary('--yuf_chess_cell_white'),
		},
		border: { radius: 0 },
		$mol_icon: {
			width: per(100),
			height: per(100),
		},
		'@': {
			yuf_chess_cell_color: {
				b: {
					background: {
						color: vary('--yuf_chess_cell_black'),
					},
					'@': {
						yuf_chess_cell_hilite: {
							true: {
								background: {
									// @ts-ignore
									color: 'color-mix(in hsl, var(--yuf_chess_cell_hilite), var(--yuf_chess_cell_black) 50%)',
								},
							}
						},
					}
				},
			},
			yuf_chess_cell_hilite: {
				true: {
					background: {
						// @ts-ignore
						color: 'color-mix(in hsl, var(--yuf_chess_cell_hilite), var(--yuf_chess_cell_white) 50%)',
					},
				}
			},
		}
	} )

}
