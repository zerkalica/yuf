namespace $.$$ {
	
	$mol_style_define( $yuf_sj_ui_device_updater_form, {
		
		File: {
			background: { color: $mol_theme.card },
			width: '6rem',
			height: '6rem',
			alignItems: 'center',
			justifyContent: 'center',
			overflow: 'hidden',
			$mol_icon: {
				width: '50%',
				height: '50%',
			},
		},

		Body: {
			gap: 0
		},

		File_field: {
			Content: {
				flex: {
					direction: 'column'
				},
				gap: $mol_gap.space,
			}
		},

		Version_label: {
			Content: {
				gap: $mol_gap.block,
			}
		},
		
		Selected_file: {
			whiteSpace: 'break-spaces',
			wordBreak: 'break-all',
			flex: {
				wrap: 'wrap',
			}
		}
	} )
	
}
