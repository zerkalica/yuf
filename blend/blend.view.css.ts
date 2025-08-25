namespace $.$$ {
	
	$mol_style_define( $yuf_blend, {

		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		zIndex: $mol_layer.speck,
		background: {
			color: 'transparent',
		},
		'@media': {
			print: {
				display: 'none'
			}
		},

		Back: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			zIndex: $mol_layer.float,
			background: {
				color: '#00000030',
			},
		},

		Content: {
			position: 'relative',
			zIndex: $mol_layer.popup,
			top: 0,

			left: '-200px',
			opacity: 0,
			// @ts-ignore
			animation: 'yuf_blend_anim .3s forwards',

			height: '100%',

			pointerEvents: 'none',

			flex: {
				shrink: 1,
				grow: 1,
			},
			'>': {
				$mol_view: {
					pointerEvents: 'auto',
					background: {
						color: $mol_theme.back,
					},
				}
			}
		},

		'@': {
			yuf_blend_direction: {
				'right-left': {
					Content: {
						left: 'auto',
						right: '-200px',
						justifyContent: 'end',
						// @ts-ignore
						animation: 'yuf_blend_anim_reverse .3s forwards',

					}
				}
			}

		}
		
	} )
	
}
