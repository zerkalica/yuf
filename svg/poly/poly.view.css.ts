namespace $.$$ {
	$mol_style_define( $yuf_svg_poly, {
		strokeLinejoin: 'round',
		strokeLinecap: 'round',
	
		strokeWidth: '3px',
		stroke: 'currentColor',
		fill: 'transparent',

		shapeRendering: 'geometricPrecision',
		strokeDasharray: '0',
		strokeDashoffset: '0',
		vectorEffect: 'non-scaling-stroke',

		'@': {
			yuf_svg_poly_selected: {
				true: {
					strokeDasharray: '10',

				}
			}
		}
	})
}
