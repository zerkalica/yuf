namespace $.$$ {
	
	$mol_style_define( $yuf_avatar_stub, {
		
		aspectRatio: 1/1,

		border: {
			radius: '50%',
		},
		background: {
			color: $mol_theme.card,
		},
		color: 'white',
		font: {
			size: '1.2rem'
		},
		justifyContent: 'center',
		alignItems: 'center',

		minHeight: '2.5rem',
		maxHeight: '2.5rem',
		position: 'relative',
		overflow: 'hidden',
		Pop: {
			position: 'absolute',
			Trigger: {
				padding: 0,
			}
		},
		Image_big: {
			flex: {
				shrink: 0,
				grow: 1,
			},
			objectFit: 'contain',
			width: '18rem',
		},

		Image: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			aspectRatio: 1/1,
			flex: {
				shrink: 1,
				grow: 1,
			},
			display: 'flex',
			objectFit: 'cover',
		},
	} )
	
}
