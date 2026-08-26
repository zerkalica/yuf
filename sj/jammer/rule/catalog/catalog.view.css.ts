namespace $.$$ {
	const { calc, hsla, vary, steps } = $mol_style_func

	$mol_style_define($yuf_sj_jammer_rule_catalog, {
		Menu: {
			flex: {
				basis: $yuf_sj_ui_theme_gap.page_l,
				grow: 0,
				shrink: 0,
			},
			Head: {
				justifyContent: 'space-between',
			}
		},

		Menu_item: {
			minHeight: '3.75rem',
			padding: { top: $mol_gap.space, bottom: $mol_gap.space },
			flex: {
				direction: 'row',
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		Menu_link: {
			padding: { top: $mol_gap.space, bottom: $mol_gap.space },
			background: {
				color: $mol_theme.card,
			},
			flex: {
				grow: 11,
			},
		},

	})


}
