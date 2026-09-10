namespace $.$$ {
	export class $yuf_plot_note extends $.$yuf_plot_note {
		
		override transform() {
			const [ shift_x, shift_y ] = this.shift()
			return super.transform()
				.replace('{x}', shift_x.toFixed(2))
				.replace('{y}', shift_y.toFixed(2))
		}

		override note_id_selected(note_id?: string | null) {
			return this.selected_key(note_id === null || note_id === undefined ? note_id : [note_id, -1])?.[0] ?? null
		}

		override polygon_click(note_id: string, e?: Event) {
			this.selected_key([note_id, -1])
		}

		override point_selected([note_id, point_index]: [note_id: string, point_index: number]) {
			const point = this.selected_key()
			return !! point && note_id === point[0] && point_index === point[1]
		}

		override point_select_event(key: [note_id: string, point_index: number], e?: Event) {
			this.selected_key(key)
		}

		@ $mol_mem_key
		override note_geometry(note_id: string) {
			let points = this.note_points(note_id)
			if( points.length === 0 ) return ''
			const shape = this.note_shape(note_id)

			const [ ax, ay ] = points[0]
			const f = (a: number, b: number) => `${a.toFixed(3)},${b.toFixed(3)}`

			if (points.length === 2) {
				const [bx, by] = points[1]

				if (shape === 'Arrow' || shape === 'Line') return `M ${f(ax, ay)} L ${f(bx, by)}`
				if (shape === 'Rectangle') return `M ${f(ax, ay)} L ${f(bx, ay)} ${f(bx, by)} ${f(ax, by)} Z`
				if (shape === 'Ellipse') {
					const cx = (ax + bx) / 2
					const cy = (ay + by) / 2
					const rx = (bx - ax) / 2
					const ry = (by - ay) / 2

					return `M ${f(cx + rx, cy)} A ${f(rx, ry)} 0 1,1 ${f(cx - rx, cy)} A ${f(rx, ry)} 0 1,1 ${f(cx + rx, cy)} Z`
				}
			}

			return `M ${f(ax, ay)} L ${points.map(p => f(p[0], p[1])).join(' ')} Z`
		}

		@ $mol_mem
		override polygons() {
			return this.note_ids_visible().map(id => this.Polygon(id))
		}

		@ $mol_mem
		override draggable_marks() {
			const note_id = this.note_id_selected()
			if (! note_id) return []
			return this.note_points(note_id).map((_, index) => this.Mark([note_id, index]))
		}

		override point_pos([note_id, point_index]: [note_id: string, point_index: number]) {
			return this.note_points(note_id)[point_index]
		}

		override Marker_end(note_id: string) {
			return this.note_shape(note_id) === 'Arrow' ? this.Arrow() : null
		}

		override polygon_selected(note_id: string) {
			return this.note_id_selected() === note_id
		}
		
	}
}
