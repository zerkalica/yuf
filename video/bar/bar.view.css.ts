namespace $.$$ {
	
	$mol_style_define($yuf_video_bar, {
		gap: $mol_gap.block,
		background: {
			color: $mol_theme.card,
		},
		flex: {
			grow: 1,
		},
		Left: {
			flex: {
				shrink: 1,
				basis: '4rem',
				grow: 0,
			}
		},

		Mid: {
			alignItems: 'center',
			flex: {
				grow: 10,
				basis: '10rem',
			}
		},

		Right: {
			alignItems: 'center',
			padding: {
				right: $mol_gap.block,
			},
		},
		Time: {
			display: 'block',
			whiteSpace: 'nowrap',
		}
		
	})
	
}
