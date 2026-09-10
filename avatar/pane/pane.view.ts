namespace $.$$ {
	export class $yuf_avatar_pane extends $.$yuf_avatar_pane {
		@ $mol_action
		protected pick_box() {
			const half_size = this.image_size().multed0(.5)
			const center = this.visible_center().added1(half_size)

			const box_size = this.size_real().divided1(this.scale()).multed0(.25)

			const lt = center.substracted1(box_size)
			const rb = center.added1(box_size)

			return [
				[lt.x, lt.y],
				[rb.x, rb.y]
			] as const
		}

		override allow_draw() {
			return Boolean(this.note_id_selected())
		}

		override note_ids() {
			const id = this.note_id_selected()
			return id ? [ id ] : []
		}

		@ $mol_mem_key
		override points(note_id: string, next?: readonly (readonly [number, number])[]) {
			if (next) return next

			return this.pick_box()
		}

		override selection_content() {
			return this.note_id_selected() ? super.selection_content() : []
		}

		@ $mol_mem_key
		override point(
			[note_id, point_index]: readonly [note_id: string, point_index: number],
			next?: readonly [number, number] | null,
			shift_press = false
		) {
			const points = this.points(note_id)
			if (next === undefined) return points[point_index]

			if (next && ! shift_press) {
				const opposite = points[point_index === 0 ? 1 : 0]
				const dx = next[0] - opposite[0]
				next = [ next[0], dx + opposite[1] ]
			}

			const next_points = next === null
				? points.filter((p, index) => point_index !== index)
				: points.map((p, index) => index === point_index ? next : p)

			return this.points(note_id, next_points)[point_index]
		}

		@ $mol_mem_key
		override note_points(note_id: string): readonly ([number, number])[] {
			const [ scale_x, scale_y ] = this.scale()
			const half_size = this.image_size().multed0(.5)
			
			const points = this.points(note_id) ?? []

			return points.map( ([ x, y ]) => [
				(x - half_size.x) * scale_x,
				(y - half_size.y) * scale_y,
			] as [number, number] )
		}
	}
}
