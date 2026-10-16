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
			marker: {
				group: 'after'
			}
		},

		'::scroll-marker-group': {
            display: 'flex',
            justifyContent: 'center',
            gap: $mol_gap.block,
			width: '100%',
			height: '.25rem',
        },

		':not( :has( :nth-child(2) ) )': {
			'>': {
				$mol_view: {
					'::scroll-marker': {
						visibility: 'hidden'
					}
				}
			}
		},

        '@supports': {
            '(scroll-marker-group: before)': {
                scrollbarWidth: 'none',
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
				'::scroll-marker': {
					content: '""',
					display: 'block',
					width: $mol_gap.emoji,
					height: $mol_gap.emoji,
					border: {
						radius: $mol_gap.round
					},
					background: { color: $mol_theme.line },
					cursor: 'pointer',
					':target-current': {
						background: { color: $mol_theme.shade },
						transform: 'scale(1.25)',
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

		minHeight: '5rem',

	} )
	
}
