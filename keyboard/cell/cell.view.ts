namespace $.$$ {
	export class $yuf_keyboard_cell extends $.$yuf_keyboard_cell {
		override title() {
			let title = super.title().replaceAll( '', '' )
			if( ! this.upcase() ) title = title.toLowerCase()

			return title
		}
		
		protected down_target = null as null | EventTarget
		override start( next?: PointerEvent ) {
			if( !next ) return
			next.preventDefault()
			this.dom_node().releasePointerCapture( next.pointerId )
			this.down_target = next.target
		}
		
		end( next?: Event ) {
			if( !next ) return
			if (next.defaultPrevented) return
			if (this.down_target === next.target) {
				this.input( new InputEvent( 'input', { data: this.symbol() } ) )
			}
			this.down_target = null
		}
		
		abort( next?: Event ) {
			if( !next ) return
			if (next.defaultPrevented) return
			this.input( new InputEvent( 'input', { data: '' } ) )
		}
	}
}
