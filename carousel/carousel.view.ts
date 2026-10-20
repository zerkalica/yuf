namespace $.$$ {
	export class $yuf_carousel extends $.$yuf_carousel {
		override event_move(e?: MouseEvent) {
			if ( ! e ) return null
			if (! this.auto_scroll()) return null
			this.mouse_x(e.pageX)
		}

		part_size() { return 1 / (this.ids().length || 1) }

		@ $mol_mem
		mouse_index() {
			const r = this.view_rect()
			if (! r) return null
			const x = this.mouse_x()
			if (! x ) return null

			const part = (x - r.left) / r.width
			return Math.floor(part / this.part_size())
		}

		@ $mol_mem
		override scroll_x(next?: number | null, cache?: 'cache') {
			const node = this.dom_node()
			if ( (next || next === 0) && ! cache) node.scrollTo({ left: next })
			return next ?? node.scrollLeft
		}

		override event_scroll( next? : Event ) { this.scroll_x(null, 'cache') }

		protected width() { return this.view_rect()?.width ?? 0 }

		@ $mol_mem
		override index(next?: number) {
			if (next !== undefined) next = Math.max(Math.min(this.ids().length - 1, next), 0)

			const width = this.width()

			const x = this.scroll_x(next === undefined ? next : width * next)
			const index = width > 0 ? Math.round(x / width) : 0
			return index
		}

		@ $mol_mem
		mouse_index_sync(next?: number) {
			const mouse_index = this.mouse_index()
			if (mouse_index === null) return 0
			const index = next ?? mouse_index
			return this.index(index)
		}

		override auto() {
			try {
				this.mouse_index_sync()
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
