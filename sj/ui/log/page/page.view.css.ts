namespace $.$$ {
	
	$mol_style_define( $yuf_sj_ui_log_page, {
		
		flex: {
			shrink: 1,
			basis: $yuf_sj_ui_theme_gap.page_xl,
		},

		Item: {
			whiteSpace: 'break-spaces',
			wordBreak: 'break-all',
			minHeight: '2.5rem',
			flex: {
				shrink: 1,
			},
			padding: {top: $mol_gap.space, bottom: $mol_gap.space, },
		},

		Head: {
			padding: $mol_gap.space,
		},
		Tools: {
			padding: $mol_gap.text,
		},

		List_dummy: {
			minHeight: '2.5rem',
			willChange: 'contents',
			flex: {
				shrink: 1,
				direction: 'column',
			},
		},

		// List: {
		// 	minHeight: '2.5rem',
		// },

		Filter_text: {
			flex: {
				basis: `24rem`,
				grow: 0,
				shrink: 1,
			},
		},

		Logs_max_group: {
			alignItems: 'center',
			gap: $mol_gap.space,
			color: $mol_theme.shade,
		},

		Logs_max_number: {
			String: {
				flex: {
					grow: 0,
					basis: '5rem',
				},
			},
			padding: 0,
		},
		
		Body: {
			background: {
				color: $mol_theme.card,
			},
		},

		Foot: {
			padding: {
				left: $mol_gap.block,
				right: $mol_gap.block,
				top: $mol_gap.space,
				bottom: $mol_gap.space
			},
		},
		Foot_tools_left: {
			flex: {
				grow: 1,
			}
		},

		Foot_tools_right: {
			flex: { grow: 0 },
			justifyContent: 'end',
		}
	} )
	
}
