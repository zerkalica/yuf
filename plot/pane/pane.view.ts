namespace $.$$ {
	export class $yuf_plot_pane extends $.$yuf_plot_pane {

		override filter() {
			const brightness = this.brightness() || 0
			const contrast = this.contrast() || 0
			if (! brightness && ! contrast ) return null!

			return super.filter()
				.replace('{brightness}', (brightness + 100).toFixed(1))
				.replace('{contrast}', (contrast + 100).toFixed(1))
		}


		@ $mol_mem
		override scale(next?: $mol_vector_2d<number>) {
			if (next?.x === 0 && next?.y === 0) {
				next = this.scale_default_by_size()
			}

			return super.scale(next)
		}

		protected shift_relative_task(next?: null | 'left-top') {
			let val = this.shift_default()
			const limit = this.shift_limit()
			if (next === 'left-top') val = new $mol_vector_2d(limit.x.max, limit.y.max)
			this.shift(val)
		}

		protected shift_relative_serial = $mol_wire_async(function shift_relative_serial_task(
			this: $yuf_plot_pane,
			next?: null | 'left-top'
		) { return this.shift_relative_task(next) } )

		protected shift_relative(next?: Parameters<typeof this.shift_relative_task>[0]) {
			return new $mol_after_frame(() => this.shift_relative_serial(next))
		}

		@ $mol_mem
		override center(next?: null | 'real' | 'fit') {
			const val = next === 'real' ? 0 : 1
			if (next !== null) this.scale(new $mol_vector_2d(val, val))
			this.shift_relative(null)
			return null
		}

		override size() {
			const size = super.size()
			const rotation = this.rotation()
			if (! rotation || rotation === 90 * 3) return size

			return new $mol_vector_2d(size.y, size.x)
		}

		override dimensions() {
			const half = this.size().multed0(.5)

			return new $mol_vector_2d(
				new $mol_vector_range(- half.x, half.x),
				new $mol_vector_range(half.y, -half.y),
			)
		}

		@ $mol_mem
		override shift_default() {
			return this.size_real().multed0(.5)
		}

		override shift_limit() {
			const prev = super.shift_limit()
			const { min, max } = Math

			const xr = new $mol_vector_range(min(prev.x.min, prev.x.max), max(prev.x.min, prev.x.max))
			const yr = new $mol_vector_range(min(prev.y.min, prev.y.max), max(prev.y.min, prev.y.max))

			return new $mol_vector_2d(xr, yr)
		}

		override defs_content() {
			return this.defs().length ? super.defs_content() : []
		}

		override zoom_relative(next?: number) {
			const whole_zoom = this.scale_default_by_size('max').x || 1
			const zoom = this.zoom() / whole_zoom

			if (next === undefined) return zoom

			if (zoom >= next) return zoom

			this.shift_relative('left-top')

			return this.zoom(next * whole_zoom) / whole_zoom
		}

		override zoom_reset() {
			this.zoom(this.zoom_default_factory())
			this.center(null)
		}

		@ $mol_mem
		override image_size_safe(): ReturnType<typeof this.image_size> {
			const prev = $mol_wire_probe(() => this.image_size_safe())
			return $mol_error_fence(() => this.image_size(), e => e, p => prev ?? p)
		}

		protected scale_default_by_size(size = 'min' as 'min' | 'max') {
			const view_size = this.size_real()
			const image_size = this.image_size_safe()
			const ratio = view_size.divided1(image_size)
			const ratio_max = Math[size]( ratio.x, ratio.y )
			return new $mol_vector_2d( ratio_max, ratio_max )
		}

		override scale_default() {
			return this.scale_default_by_size('min')
		}

		@ $mol_mem
		override scale_limit() {
			const limit = this.zoom_limit()
			const scale = this.scale_default_by_size()
			const min = scale.multed0(limit.min)
			const max = scale.x * limit.max

			const size = this.image_size()
			const gap = this.gap()
			const edge = new $mol_vector_2d(gap.x.max - gap.x.min, gap.y.min - gap.y.max).divided1(size)

			return new this.$.$mol_vector_2d(
				new $mol_vector_range( min.x - edge.x, max ),
				new $mol_vector_range( min.y, max - edge.y )
			)
		}

		override zoom_default_factory() {
			return this.scale_default_by_size().x
		}

		@ $mol_mem
		override zoom( next?: number | null) {
			return this.scale(next === undefined ? next : ! next
				? this.scale_default()
				: new $mol_vector_2d(next, next),
			).x
		}

		override image_size() {
			return this.$.$mol_one.$yuf_media_meta.size([ this.type(), this.url() ])
		}

		override tile_uri([l, x, y]: [number, number, number]) {
			return x !== 0 || y !== 0 ? '' : this.url()
		}

		@ $mol_action
		override action_point_normalized() {
			// cursor distance from center
			const cursor = this.action_point()
			return ! cursor || Number.isNaN(cursor.x) ? null : cursor.added1(this.size().multed0(.5))
		}

		protected cursor_at_start = null as null | $mol_vector_2d<number>

		override draw_start(event: Event) {
			super.draw_start(event)
			this.cursor_at_start = this.action_point()
			this.points_move('start')
		}

		override draw_end( next?: Event ) {
			this.cursor_at_start = null
			this.points_move(null)
			super.draw_end(next)
		}

		override action_point_delta() {
			const cursor = this.action_point()
			return ! this.cursor_at_start || ! cursor || Number.isNaN(cursor.x)
				? null
				: cursor.substracted1(this.cursor_at_start)
		}

		override draw(e?: Event & { shiftKey?: boolean }) {
			if (! e ) return null

			const event = $mol_dom_event.wrap(e)
			if (event.prevented()) return null
			event.prevented(true)

			const action = this.action_type()
			if (action !== 'draw') return null

			if ( ! this.cursor_at_start ) return null
			const cursor = this.action_point()
			if (! cursor) return null
			const shift_press = this.shift_press(event.native)
			this.points_move(shift_press ? 'shift' : 'move')
			return null
		}

		@ $mol_action
		protected shift_press(e: Event & { shiftKey?: boolean }) {
			return e.shiftKey ?? false
		}

		@ $mol_mem
		override visible_center() {
			const shift = this.shift()
			const scale = this.scale()
			const pane_halfsize = this.size_real().multed0(.5)

			return (pane_halfsize.substracted1(shift)).divided1(scale)
		}

		@ $mol_mem
		override selected_key(next?: readonly[note_id:string,point_index:number] | null) {
			const note_id = this.note_id_selected(next?.[0])
			return ! note_id ? null : [ note_id, next?.[1] ?? -1 ] as const
		}

		override point(
			key: readonly [note_id: string, point_index: number],
			next?: readonly [number, number] | null,
			shift_press = false
		) {
			return super.point(key, next)
		}

		protected points_at_start = null as null | readonly (readonly [number, number])[]

		@ $mol_mem
		override points_move(next?: 'start' | 'shift' | 'move' | null) {
			const id = this.note_id_selected()
			if (! id ) return null

			if (next === null) this.points_at_start = null
			if (next === 'start') this.points_at_start = this.points(id)

			if (! next || next === 'start') return null

			const key = this.selected_key()
			const point_index = key?.[1] ?? -1
			if ( point_index < 0 ) {
				const delta = this.action_point_delta()
				if (! delta ) return next
				const next_points = this.points_at_start?.map(p => [ p[0] + delta.x, p[1] + delta.y ] as const) ?? []
				this.points(id, next_points)
				return next
			}

			const cursor = this.action_point_normalized()
			if (! key || ! cursor ) return next
			this.point(key, [cursor.x, cursor.y], next === 'shift')
			return next
		}

	}
}
