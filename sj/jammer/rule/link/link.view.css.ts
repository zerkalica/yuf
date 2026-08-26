namespace $.$$ {
	
	$mol_style_define( $yuf_sj_jammer_rule_link, {
		
		flex: {
			direction: 'column',
			shrink: 1,
			grow: 0,
			basis: '7rem'
		},

		gap: $mol_gap.space,

		minHeight: '5.5rem',

		Time_row: {
			justifyContent: 'space-between',
		},

		Uuid: {
			color: $mol_theme.shade,
			font: {
				size: '.9rem'
			},
			flex: {
				grow: 0,
				wrap: 'nowrap',
			},
			maxWidth: '8rem',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
		},

		Freqs: {
			color: $mol_theme.shade,
			font: {
				size: '.9rem'
			},
			minHeight: '1.25rem',
			flex: {
				grow: 0,
				wrap: 'nowrap',
			},
			display: 'block',
			maxWidth: '24rem',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
		},

		Spreads: {
			color: $mol_theme.shade,
			font: {
				size: '.9rem'
			},
			minHeight: '1.25rem',
			flex: {
				grow: 0,
				wrap: 'nowrap',
			},
			display: 'block',
			maxWidth: '24rem',
		},

		Comment: {
			color: $mol_theme.text,
			minHeight: '1rem',
			flex: {
				wrap: 'wrap',
			},
			font: {
				size: '1rem'
			}
		},

	} )
	
}
