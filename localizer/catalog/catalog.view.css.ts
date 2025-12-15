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

		$mol_text_span: {
			'@': {
				'mol_text_type': {
					'emphasis': {
						color: $mol_theme.current,
					}
				}
			}
		},

		Description_list: {
			flex: {
				shrink: 1,
			},
		},
		Description_page: {
			flex: {
				basis: $yuf_theme_gap.page_xl
			},
			Body_content: {
				padding: 0,
			}
		},

		Menu_item: {
			padding: 0
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
