namespace $ {
	const { vary } = $mol_style_func

	$mol_style_define( $yuf_chess_cell , {
		minWidth: '2.25rem',
		minHeight: '2.25rem',
		// aspectRatio: 1,
		background: {
			color: vary('--yuf_chess_cell_white'),
		},
		border: { radius: 0 },
		$mol_icon: {
			width: '100%',
			height: '100%',
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
				w: {
					'@': {

						yuf_chess_cell_hilite: {
							true: {
								background: {
									// @ts-ignore
									color: 'color-mix(in hsl, var(--yuf_chess_cell_hilite), var(--yuf_chess_cell_white) 50%)',
								},
							}
						},
					}
				}
			},
		}
	} )

}
