namespace $.$$ {
	
	$mol_style_define( $yuf_sj_ui_network_form, {
		
		Ip_type_field: {
			Content: {
				flex: {
					direction: 'column'
				},
				gap: $mol_gap.text,
			}
		},

		Body: {
			gap: $mol_gap.space,
		},

		Ip_content: {
			flex: {
				direction: 'column'
			},
		},

		No_actual_ip: {
			flex: { basis: '352px' },
			justifyContent: 'center',
			alignItems: 'center',
			background: { color: $mol_theme.card },
			border: { radius: $mol_gap.round },
		},
		Foot: {
			gap: $mol_gap.block,
		},

		$mol_string: {
			// @ts-ignore
			':disabled:not(:placeholder-shown)': {
				background: {
					color: $mol_theme.field,
				}
			}
		}

	} )
	
}
