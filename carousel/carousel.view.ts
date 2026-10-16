namespace $.$$ {
	export class $yuf_carousel extends $.$yuf_carousel {
		@ $mol_mem
		mouse_pos(next?: readonly [ x: number, y: number ]) {
			return next ?? null
		}

		override event_move(e?: MouseEvent) {
			if ( ! e ) return null
			this.mouse_pos([ e.pageX, e.pageY ])
		}

		@ $mol_mem
		part_size() {
			return 1 / (this.ids().length || 1)
		}

		@ $mol_mem
		selected_index() {
			const r = this.view_rect()
			const [ x, y ] = this.mouse_pos() ?? []

			if (! r || x === undefined || y === undefined) return 0

			const part = (x - r.left) / r.width
			return Math.floor(part / this.part_size())
		}

		@ $mol_mem
		switched() {
			const index = this.selected_index()
			
			const r = this.view_rect()
			if (! r) return null

			const left = r.width * index
			this.dom_node().scrollTo({ left })

			return index
		}

		override auto() {
			try {
				this.switched()
			} catch (e) {
				$mol_fail_log(e)
			}
		}

		@ $mol_mem
		override images() {
			const items = this.ids().map(id => this.url_safe(id) ? this.Image(id) : this.Empty(id))

			return items.length ? items : [ this.Empty('0') ]
		}

		protected url_safe(id: string) {
			return $mol_error_fence(
				() => this.url(id),
				e => e.message === $mol_rest_code[$mol_rest_code['Not Found']] ? '' : e,
			)
		}

		override url(path: string) { return path }
	}
}
