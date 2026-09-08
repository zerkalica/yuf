namespace $.$$ {
	
	$mol_style_define( $yuf_svg_drag, {
		vectorEffect: 'non-scaling-stroke',
		fill: 'var(--mol_theme_back)',
		fillOpacity: '0.2',
		Outer: {
			strokeWidth: '2px',
			stroke: 'gray',
		},

		'@': {
			'mol_theme': {
				'$mol_theme_accent': {
					Outer: {
						stroke: 'red',
					}
				}
			}
		}
	} )
	
}
