namespace $.$$ {
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

}
