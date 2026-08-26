namespace $.$$ {
	
	$mol_style_define( $yuf_sj_ui_device_link, {
		padding: 0,
		flex: {
			grow: 1,
			shrink: 1,
		},
		gap: $mol_gap.block,
		minHeight: '9rem',

		Description: {
			justifyContent: 'space-between',
			minHeight: '1.25rem',
			alignItems: 'end',
			gap: $mol_gap.text,
		},

		Status_block: {
			alignItems: 'center',
			gap: $mol_gap.space,
		},

		Footer: {
			justifyContent: 'space-between',
			flex: {
				wrap: 'wrap',
				shrink: 1,
				grow: 1,
				direction: 'row',
			},
			gap: $mol_gap.space,
		},

		Version_label: {
			flex: { basis: '10rem', shrink: 1, wrap: 'nowrap' },
		},
		Uptime_label: {
			flex: { basis: '7rem' },
		},
		Uptime: {
			color: $mol_theme.text,
			font: {size: '1rem' },
		},
		Serial_label: {
			Content: {
				font: {size: '.9rem' },

			},
			flex: {
				basis: '24rem',
			},
		},

		Device_type_label: {
			flex: { basis: '6rem' },
		},
	} )

	$mol_style_define( $yuf_sj_ui_device_link_label, {
		flex: {
			direction: 'column',
		},
		Content: {
			wordBreak: 'break-all',
			whiteSpace: 'break-spaces',
			flex: { shrink: 1 },
			padding: 0,
			minHeight: '1.5rem',
			color: $mol_theme.text,
		},
		gap: 0,
		Label: {
			minHeight: '1rem',
			padding: 0,
			color: $mol_theme.shade,
		},
	})
	
}
