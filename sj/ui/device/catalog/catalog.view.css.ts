namespace $.$$ {
	
	$mol_style_define( $yuf_sj_ui_device_catalog, {
		
		Menu: {
			flex: {
				basis: $yuf_sj_ui_theme_gap.page_l,
			},
		},
	} )

	$mol_style_define( $yuf_sj_ui_device_catalog_item, {
		padding: { top: $mol_gap.space, bottom: $mol_gap.space },
		border: {
			radius: $mol_gap.round,
		},
		overflow: 'hidden',


		flex: {
			direction: 'row',
		},

		Link: {
			background: {
				color: $mol_theme.card,
			},
			border: {
				// @ts-ignore
				bottomRight: { radius: 0 },
				topRight: { radius: 0 },
			},
			flex: {
				direction: 'column',
				grow: 1,
			},
			padding: $mol_gap.text,
		},
		Buttons: {
			background: {
				color: $mol_theme.back,
			},
			border: {
				// @ts-ignore
				bottomRight: { radius: $mol_gap.round },
				topRight: { radius: $mol_gap.round },
			},
			alignSelf: 'stretch',
			flex: { direction: 'column' },
			gap: $mol_gap.space,
		},

	})
	
}
