namespace $.$$ {
	export class $yuf_plot_tiles extends $.$yuf_plot_tiles {
		override Tile(id: unknown) {
			return this.tile_type(id) === 'video' ? this.Tile_video(id) : super.Tile(id)
		}

		override level() {
			return this.level_override() ?? super.level()
		}

		override transform() {
			const flip_h = this.flipped_hor()
			const flip_v = this.flipped_vert()
			const rotation = this.rotation()
			const size = this.size_real()

			let x = 0
			let y = 0

			if (rotation === 90) x+= size.x
			if (rotation === 90 * 2) {
				x += size.x
				y += size.y
			}
			if (rotation === 90 * 3) y += size.y

			if (flip_h) x -= size.x
			if (flip_v) y -= size.y

			return super.transform()
				.replace('{sc_x}', flip_h ? '-1' : '1')
				.replace('{sc_y}', flip_v ? '-1' : '1')
				.replace('{tr_x}', x.toFixed(0))
				.replace('{tr_y}', y.toFixed(0))
				.replace('{rotation}', rotation.toFixed(0))
		}

		@ $mol_mem_key
		override tile_uri(id: [number, number, number]): string {
			const prev = $mol_wire_probe(() => this.tile_uri(id))

			this.tile_error(id, [])

			return $mol_error_fence(
				() => this.tile_uri_actual(id) || this.tile_empty_url(id),
				e => ($mol_fail_log(e), this.tile_error(id, [e]), this.tile_error_url(id)),
				p => prev ?? p
			)
		}

		@ $mol_mem_key
		override tile_error(id: [number, number, number], next?: readonly Error[]) {
			if (! next) return []

			const ids = this.tile_error_ids().filter(target => target !== id)
			if (next.length) ids.push(id)
			this.tile_error_ids(ids)
			return next
		}

		override Active_video() {
			const id = this.tile_main_id()
			return this.Tile_video(id)
		}

		@ $mol_action
		override click_event(id: unknown, e: Event) {
			this.playing(! this.playing())
		}

		protected shift_flipped() {
			const flip_h = this.flipped_hor()
			const flip_v = this.flipped_vert()
			const rotation = this.rotation()
			const size = this.size_real()

			let [ x, y ] = this.shift()

			let y_next

			if (rotation === 90) {
				y_next = size.x - x
				x = y
				y = y_next
			}

			if (rotation === 90 * 2) {
				x = size.x - x
				y = size.y - y
			}

			if (rotation === 90 * 3) {
				y_next = x
				x = size.y - y
				y = y_next
			}

			if (flip_h) x = size.x - x
			if (flip_v) y = size.y - y

			return [x, y]
		}


		@ $mol_mem_key
		override tile_transform( id: readonly [number, number, number] ) {
			const [ level, x, y ] = id
			const [ shift_x, shift_y ] = this.shift_flipped()
			const [ scale_x, scale_y ] = this.scale()
			const count = 1 << level
			const tile_size = this.tile_dims_real()

			const pos_x = ( ( x / count - .5 ) * tile_size[0] * scale_x + shift_x )
			const pos_y = ( ( y / count - .5 ) * tile_size[1] * scale_y + shift_y )
			
			const scale = scale_x / 2**level + .5 / tile_size[1]
			
			return `translate(${pos_x.toFixed(0)}px,${pos_y.toFixed(0)}px) scale(${scale.toFixed(3)})`
		}

	}
}
