namespace $.$$ {
	type Token = {
		name: '' | 'emphasis' | 'bullet'
		chunk: string
	}

	type Row = Token[]

	export class $yuf_svg_text extends $.$yuf_svg_text {
		@ $mol_mem
		rows_tokens(): Row[] {
			const tag_prefix = this.tag_prefix()
			const tag_path_separator = this.tag_path_separator()
			const rows = this.$.$yuf_text_wrap(this.text(), this.max_length()).split('\n')
			// short tags can be on one line, sort by length
			const tags = this.tags()

			const max_length = Math.max(24, rows.reduce((acc, row) => Math.max(row.length, acc), 0))

			const tag_rows = [] as Row[]

			for(let i = 0, added_len = 0; i < tags.length; i++) {
				const chunk = this.$.$yuf_text_short(tags[i], tag_path_separator)
				const tag = tag_prefix + chunk
				if (! added_len || (added_len + tag.length > max_length)) {
					tag_rows.push([])
					added_len = 0
				}

				added_len += tag.length

				tag_rows[tag_rows.length - 1].push(
					{ name: 'bullet', chunk: tag_prefix },
					{ name: 'emphasis', chunk: chunk },
				)
			}

			return [
				...rows.map(chunk => [{ name: '' as const, chunk }]),
				...tag_rows,
			]
		}

		override theme() {
			return this.selected() ? super.theme() : ''
		}

		override lines() {
			return this.rows_tokens().map((_, i) => this.Text(i))
		}

		@ $mol_mem_key
		override text_content(index: number) {
			const tokens = this.rows_tokens()[index]

			return tokens.map(({name, chunk }, token_index) => name
				? this[`Tag_${name}`]?.([index, token_index])
				: chunk
			)
		}

		override tag([row_index, token_index]: readonly [number, number]) {
			return this.rows_tokens()[row_index][token_index].chunk
		}

		override chunk_pos_x(index: number) {
			return this.label_pos().x.toFixed(3)
		}

		override chunk_pos_y(index: number) {
			const line_height = this.line_height()
			const font_size = this.font_size()

			const val = this.label_pos().y + line_height * ( index + 1) - 2 - (line_height - font_size) / 2

			return val.toFixed(3)
		}

		@ $mol_mem
		override box_size() {
			const font = this.font_size() + 'px ' + this.font_family()
			let max_width = 0

			const rows = this.rows_tokens()

			for (let row_index = 0; row_index < rows.length; row_index++ ) {
				const str = rows[row_index].map(item => item.chunk).join('')
				const width = this.$.$mol_font_measure(font, str)
				if (width > max_width) max_width = width
			}

			const lines = rows.length || 1
			const height = lines * this.line_height()

			return new $mol_vector_2d<number>(max_width, height).added1(this.gap().multed0(2))
		}

		override box_size_x() { return this.box_size().x.toFixed(3) }
		override box_size_y() { return this.box_size().y.toFixed(3) }

		@ $mol_mem
		box_pos() { return this.label_pos().substracted1(this.gap()) }

		override box_pos_x() { return this.box_pos().x.toFixed(3) }
		override box_pos_y() { return this.box_pos().y.toFixed(3) }
	}
}
