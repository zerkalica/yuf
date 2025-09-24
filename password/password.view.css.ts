namespace $.$$ {
	
	$mol_style_define( $yuf_password, {
		
		flex: {
			shrink: 1,
		},

		Show: {
			position: 'relative',
			zIndex: $mol_layer.speck,
			cursor: 'pointer',
			margin: {
				left: '-3rem',
			},
			$mol_icon: {
				width: '1.5rem',
			},
			color: $mol_theme.control,
			':hover': {
				zIndex: $mol_layer.speck,
				boxShadow: 'none',
				color: $mol_theme.text,
			},
			':focus': {
				zIndex: $mol_layer.speck,
				boxShadow: 'none',
			},
		},
		Pass: {
			order: '-1',
			padding: {
				right: '3rem',
			},
		}

	} )
	
}
