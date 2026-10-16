namespace $.$$ {
	
	$mol_style_define( $yuf_carousel, {
		transition: 'none',
		overflow: {
			y: 'hidden',
			x: 'auto',
		},
		scroll: {
			snap: {
				type: ['x', 'mandatory'],
				stop: 'always',
				align: 'start',
			},
		},
		'>': {
			$mol_view: {
				scroll: {
					snap: {
						type: 'none',
						stop: 'always',
						align: 'start',
					},
				},
			},
		},
	
		alignItems: 'center',
		Image: {
			width: '100%',
			height: '100%',
			minHeight: 'auto',
			flex: {
				shrink: 0,
				grow: 0,
			},
			objectFit: 'contain',
		},

		Empty: {
			width: '100%',
			height: '100%',
			minHeight: 'auto',
		},

		minHeight: '5rem'

	} )
	
}
