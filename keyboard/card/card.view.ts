namespace $.$$ {
	export class $yuf_keyboard_card extends $.$yuf_keyboard_card {
		
		override row_input( row_index: number, next?: InputEvent ) {
			if( !next ) return
			this.input( next )
		}

		@ $mol_mem
		override max_buttons() {
			const layouts = this.layouts()
			let max = super.max_buttons()

			for (const layout of Object.values(layouts)) {
				const rows = layout.variants()['']
				if (! rows.length) continue

				for (const row of rows) {
					max = Math.max(max, row.length)
				}
			}

			return max
		}

		layout_ids() {
			return Object.keys(this.layouts())
		}

		layout_variants() {
			const layouts = this.layouts()
			const layout = layouts[ this.layout() ] ?? layouts[ '' ]!

			return layout.variants()
		}

		@ $mol_action
		layout_switch() {
			this.layout(this.lang_next())
		}

		@ $mol_mem
		override lang_next() {
			const layouts = this.layout_ids()
			let index = layouts.indexOf(this.layout()) + 1
			if (index >= layouts.length) index = 0

			return layouts[index]
		}

		@ $mol_mem
		variant_next() {
			const variants = Object.keys(this.layout_variants())
			let index = variants.indexOf(this.variant()) + 1
			if (index >= variants.length) index = 0

			return variants[index]
		}

		@ $mol_action
		variant_switch() {
			this.variant(this.variant_next())
		}

		layout_rows() {
			return this.layout_variants()?.[this.variant()]!
		}
		
		override row_layout( row_index: number ) {
			const rows = this.layout_rows()
			return rows[row_index]
		}

		override rows() {
			return this.layout_rows().map( (row, index) => this.Row(index))
		}


		reset() {
			this.variant('')
		}

		input( next?: InputEvent ) {
			if( !next ) return
			
			let val = next.data!
						
			if (this.layout_ids().includes(val)) {
				return this.layout_switch()
			}

			if (val === 'abc' || val === ',.;') return this.variant_switch()
			if (val === '⇑') {
				this.upcase( ! this.upcase() )
				this.reset()
				return
			}

			const el = this.area().dom_node() as HTMLInputElement

			const active = this.$.$mol_dom_context.document.activeElement
			if (active !== el) return

			let sel_start = el.selectionStart ?? 0
			let sel_end = el.selectionEnd ?? 0
			
			let before = el.value.slice( 0, sel_start )
			let sel = el.value.slice( sel_start, sel_end )
			let after = el.value.slice( sel_end )

			switch( val ) {
				
				case '◀':
					el.selectionEnd = sel_start - 1
					this.reset()
					return
				
				case '▶':
					el.selectionStart = sel_end + 1
					this.reset()
					return
				
				case '⌫':
					if( !sel ) before = before.slice( 0, -1 )
					val = ''
					break
				
				case '↩':
					$mol_dom.document.execCommand( 'undo' )
					return
				
				case '↪':
					$mol_dom.document.execCommand( 'redo' )
					return
			}

			if( !this.upcase() ) val = val.toLowerCase()
			
			el.value = before + val + after
			
			el.selectionStart = el.selectionEnd = before.length + val.length
			el.dispatchEvent( next )
			
			this.reset()
			this.upcase( false )
			
		}
		
	}

	export class $yuf_keyboard_row extends $.$yuf_keyboard_row {
		override cells() {
			return this.layout().map((symbol, index) => this.Cell(index))
		}

		override cell_symbol(col_index: number) {
			const title = this.layout()[col_index] ?? super.cell_symbol(col_index)

			if (title === 'lang') return this.lang_next()
			return title
		}

		override cell_input(col_index: number, next?: InputEvent) {
			if( !next ) return
			this.input( next )			
		}

		override width_mul(col_index: number) {
			const title = this.cell_symbol(col_index)
			if (title !== ' ') return super.width_mul(col_index)
			const diff = this.max_buttons() - this.layout().length + 1
	
			return diff.toFixed(0)
		}
	}

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
