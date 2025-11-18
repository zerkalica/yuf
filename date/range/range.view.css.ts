namespace $.$$ {
	
	$mol_style_define( $yuf_date_range, {

		From: {
			Bubble: {
				margin: {
					left: '-.25rem'
				}
			},
		},
		To: {
			Bubble: {
				margin: {
					right: '-.25rem'
				}
			},
		},
		Separator: {
			height: '2.5rem',
			alignItems: 'center',
		},

	})

	$mol_style_define( $yuf_date_range_date, {
		
		Bubble: {
			maxWidth: '19rem',
		},
		Trigger: {
			padding: $mol_gap.block,
			'@': {
				mol_check_checked: {
					true: {
						color: $mol_theme.current
					}
				}
			}
		},
		Input: {
			flex: {
				basis: '5rem'
			}
		},
		Calendar: {
			Day: {
				padding: 0
			},
		}
		
	} )
	
}
