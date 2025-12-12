namespace $.$$ {
	
	$mol_style_define( $yuf_localizer_catalog, {
		Menu: {
			flex: {
				basis: $yuf_theme_gap.page_l,
			},

			Title: {
				padding: 0,
				gap: 0,
			},

		},
		Menu_logo: {
			width: '3rem',
			height: '2.5rem',
		},

		Selected_project: {
			Trigger: {
				flex: {
					wrap: 'nowrap',
				},
				display: 'block',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				maxWidth: '6rem',
			},

		},
		Selected_lang: {
			Trigger: {
				width: '3rem',
			},
		},
		Keys_filter: {
			Trigger: {
				minWidth: '7rem',
			},
		},
		Menu_link: {
			flex: {
				wrap: 'wrap'
			},
			wordBreak: 'break-all',
			whiteSpace: 'break-spaces',
		}
		
	} )
	
}
