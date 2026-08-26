namespace $.$$ {
	
	$mol_style_define( $yuf_sj_jammer_task_link, {
		
		Description: {
			justifyContent: 'space-between',
		},

		minHeight: '8rem',

		flex: {
			direction: 'column',
			grow: 1,
			shrink: 1,
		},
		padding: $mol_gap.text,
		background: {
			color: $mol_theme.card,
		},

		Title: {
			gap: $mol_gap.space,
			color: $mol_theme.shade,
		},

		Status_block: {
			gap: $mol_gap.block,
			alignItems: 'center',

		},

		User_icon: {
			color: $mol_theme.text,
		}

	} )
	
}
