namespace $.$$ {
	
	$mol_style_define( $yuf_localizer_catalog, {
		Menu: {
			flex: {
				basis: $yuf_theme_gap.page_l,
			},

			Title: {
				gap: 0,
			},

			Foot: {
				justifyContent: 'space-between',
			}

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
