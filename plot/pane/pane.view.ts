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
	}
}
