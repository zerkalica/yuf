namespace $ {
	const { rem, px, em, per, vw, vh, vmin, s } = $mol_style_unit
	const { calc, hsla, vary, steps } = $mol_style_func

	$mol_style_define( $yuf_chess_board_label, {
		flex: {
			direction: 'row',
			wrap: 'nowrap',
			grow: 1,
			shrink: 1,
		},
		gap: $mol_gap.space,
		padding: $mol_gap.text,
	})

	$mol_style_define( $yuf_chess_board , {
		background: {
			color: $mol_theme.card ,
		},
		border: { radius: vary('--yuf_chess_board_round') },
		display: 'flex',
		flex: {
			direction: 'column',
			grow: 0,
			shrink: 1,
			basis: vmin(90),
		},
		Toolbar: {
			padding: {
				left: rem(1),
			},
		},
		// Placeholder: {
		// 	flex: {
		// 		grow: 1,
		// 	}
		// },
		// Footer: {
		// 	flex: {
		// 		grow: 1,
		// 	}
		// },

		Fields: {
			// border: { radius: $mol_gap.round },
			// background: {
			// 	color: vary('--mol_theme_card')
			// },
			display: 'grid',
			gridTemplateColumns: 'repeat(8, 1fr)',
			gridTemplateRows: 'repeat(8, 1fr)',
			alignItems: 'stretch',
			overflow: 'auto',
			aspectRatio: 1,
			padding: {
				bottom: 0
			},
			'@': {
				yuf_chess_board_gameover: {
					'w': {
						Cell: {
							filter: 'grayscale(1)'
						}
					},
					'b': {
						Cell: {
							filter: 'sepia(.75)'
						}
					}
				},
				yuf_chess_board_ruler: {
					'true': {
						gridTemplateColumns: '1.25rem repeat(8, 1fr) 1.25rem',

					}
				}
			}
		},
		Left: {
			display: 'grid',
			gridTemplateColumns: 'auto',
			gridTemplateRows: 'repeat(8, 1fr)',
			gridColumnStart: '1',
			gridColumnEnd: '1',
			gridRowStart: '1',
			gridRowEnd: '9',
		},
		Right: {
			display: 'grid',
			gridTemplateColumns: 'auto',
			gridTemplateRows: 'repeat(8, 1fr)',
			gridColumnStart: '10',
			gridColumnEnd: '10',
			gridRowStart: '1',
			gridRowEnd: '9',
		},
		Bottom: {
			display: 'grid',
			gridTemplateRows: 'auto',
			gridTemplateColumns: 'repeat(8, 1fr)',
			gridColumnStart: '2',
			gridColumnEnd: '10',
			gridRowStart: '9',
			gridRowEnd: '9',
		},
		Cell: {
			transitionProperty: 'filter',
			transitionDuration: '1s',
			'@': {
				yuf_chess_cell_id: {
					'h1': {
						borderBottomRightRadius: vary('--yuf_chess_cell_round') as any,
					},
					'a1': {
						borderBottomLeftRadius: vary('--yuf_chess_cell_round') as any,
					},
					'h8': {
						borderTopRightRadius: vary('--yuf_chess_cell_round') as any,
					},
					'a8': {
						borderTopLeftRadius: vary('--yuf_chess_cell_round') as any,
					},
				},
			}

		},

		Score_field: {
			flex: {
				direction: 'column',
			},
			justifyContent: 'center',
			alignItems: 'center',
		},
		Y_rule: {
			flex: {
				direction: 'column',
			},
			justifyContent: 'center',
			alignItems: 'center',
		},
		X_rule: {
			flex: {
				direction: 'column',
			},
			justifyContent: 'center',
			alignItems: 'center',
		},

	} )
}
