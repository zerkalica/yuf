namespace $.$$ {
	
	$mol_style_define( $yuf_attach, {
		Add_icon: {
			width: '100%',
			height: '100%',
		},

		Item: {
			width: '5rem',
			height: '5rem',
			border: {
				radius: $mol_gap.round,
			},
			padding: 0,
		},
		Content: {
			gap: $mol_gap.block,
		},
		height: 'min-content',
		width: 'min-content',
		Add: {
			width: '5rem',
			height: '5rem',
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
			justifyContent: 'center',
			alignItems: 'center',
			overflow: 'hidden',
			padding: $mol_gap.space,
		},
	} )

	$mol_style_define( $yuf_attach_item, {
		background: {
			color: $mol_theme.card,
		},
		border: {
			radius: $mol_gap.round,
		},
		position: 'relative',

		Remove_icon: {
			position: 'absolute',
			zIndex: $mol_layer.float,
			right: '.25rem',
			top: '.25rem',
			width: '1rem',
			height: '1rem',
			color: $mol_theme.shade
		},

		Unknown_icon: {
			width: '100%',
			justifyContent: 'center',
			flex: {
				basis: '4rem',
				grow: 1,
			},
		},
		Image: {
			width: '100%',
			height: '100%',
			background: {
				color: $mol_theme.card,
			}
		},

		'@': {
			yuf_attach_item_status: {
				upload: {
					animation: {
						name: 'mol_view_wait',
						duration: '1s',

						timingFunction: {
							prefix: () => '',
							postfix: () => '',
							name: 'steps',
							value: '20, end'
						},
						iterationCount: 'infinite',

					},
				}
			}
		}
	})
	
	$mol_style_define( $yuf_attach_unknown, {
		Image: {
			width: '100%',
			height: '100%',
			background: {
				color: $mol_theme.card,
			}
		},
		padding: $mol_gap.block,
		flex: {
			direction: 'column',
			grow: 1,
		},
		justifyContent: 'space-between',
		alignItems: 'center',
		Text: {
			alignItems: 'center',
			justifyContent: 'center',
		},

	} )
}
