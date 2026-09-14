namespace $.$$ {
	
	$mol_style_define( $yuf_avatar_stub, {
		
		font: {
			size: '1.2rem'
		},
		minHeight: '2.5rem',
		maxHeight: '2.5rem',

		aspectRatio: 1/1,

		border: {
			radius: '50%',
		},
		background: {
			color: $mol_theme.card,
		},
		color: 'white',
		justifyContent: 'center',
		alignItems: 'center',

		position: 'relative',
		overflow: 'hidden',
		Pop: {
			position: 'absolute',
			Trigger: {
				padding: 0,
			},
			Bubble: {
				flex: {
					direction: 'column',
				},
			},
		},

		Image: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			aspectRatio: 1/1,
			flex: {
				shrink: 1,
				grow: 1,
			},
			display: 'flex',
			objectFit: 'cover',
		},

		Image_big: {
			flex: {
				shrink: 0,
				grow: 1,
			},
			objectFit: 'contain',
			width: '18rem',
			border: {
				bottomLeft: {
					radius: 0
				},
				bottomRight: {
					radius: 0
				},
			}
		},

		Name: {
			background: {
				color: 'transparent',
			},
			font: {
				size: '.9rem',
			},
			lineHeight: '1.1rem',
			opacity: .8,
			flex: {
				direction: 'row',
			},
			gap: $mol_gap.block,
			justifyContent: 'space-between',

			overflow: 'hidden',
			padding: $mol_gap.space,
		}
	} )
	
}
