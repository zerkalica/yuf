namespace $.$$ {
	type Tile_id = [number, number, number]

	export class $yuf_plot_tiles extends $.$yuf_plot_tiles {
		override Tile(id: Tile_id) {
			return this.tile_type(id) === 'video' ? this.Tile_video(id) : this.Tile_image(id)
		}

		override level() {
			return this.level_override() ?? super.level()
		}


		@ $mol_mem
		override transform() {
			const flip_h = this.flipped_hor()
			const flip_v = this.flipped_vert()
			const rotation = this.rotation()

			if (! flip_h && ! flip_v && ! rotation) return null

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

			return this.transform_cmd()
				.replace('{sc_x}', flip_h ? '-1' : '1')
				.replace('{sc_y}', flip_v ? '-1' : '1')
				.replace('{tr_x}', x.toFixed(0))
				.replace('{tr_y}', y.toFixed(0))
				.replace('{rotation}', rotation.toFixed(0))
		}

		@ $mol_mem_key
		override tile_uri(id: Tile_id): string {
			const prev = $mol_wire_probe(() => this.tile_uri(id))

			this.tile_error(id, [])

			return $mol_error_fence(
				() => this.tile_uri_actual(id) || this.tile_empty_url(id),
				e => ($mol_fail_log(e), this.tile_error(id, [e]), this.tile_error_url(id)),
				p => prev ?? p
			)
		}

		@ $mol_mem_key
		override tile_error(id: Tile_id, next?: readonly Error[]) {
			if (! next) return []

			const ids = this.tile_error_ids().filter(target => target !== id)
			if (next.length) ids.push(id)
			this.tile_error_ids(ids)
			return next
		}

		error_event(id: Tile_id, next?: Event | null) {
			this.tile_error(id, next ? [ new Error(next.type, { cause: next }) ] : undefined)
			return null
		}

		override Active_video() {
			const id = this.tile_main_id()
			return this.Tile_video(id)
		}

		@ $mol_action
		override click_event(id: Tile_id, e: Event) {
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

		override tile_dims_real() {
			return $mol_error_fence(() => this.image_size(), e => ($mol_fail_log(e), new $mol_vector_2d(0, 0)))
		}

		@ $mol_mem_key
		override tile_transform( id: Tile_id ) {
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
