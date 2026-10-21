namespace $.$$ {
	export class $yuf_carousel extends $.$yuf_carousel {
		override event_move(e?: MouseEvent) {
			if ( ! e ) return null
			if (! this.auto_scroll()) return null
			if (this.mouse_x !== -1) return null

			this.mouse_x = e.pageX
			new $mol_after_frame(() => this.mouse_index())
		}

		protected mouse_x = -1

		protected count() { return this.ids().length || 1 }

		mouse_index() {
			const x = this.mouse_x
			const r = this.view_rect()
			if (! r) return null
			const count = this.count()
			const index = Math.max(0, Math.floor((x - r.left) / r.width * count))
			this.scroll_x(index * r.width)
			this.mouse_x = -1
		}

		@ $mol_mem
		override scroll_x(next?: number | null, cache?: 'cache') {
			const node = this.dom_node()
			if ( (next || next === 0) && ! cache) node.scrollTo({ left: next })
			return next ?? node.scrollLeft
		}

		override event_scroll( next? : Event ) { this.scroll_x(null, 'cache') }

		@ $mol_mem
		override index(next?: number) {
			if (next !== undefined) next = Math.max(Math.min(this.ids().length - 1, next), 0)

			const width = this.view_rect()?.width ?? 0

			const x = this.scroll_x(next === undefined ? next : width * next)
			const index = width > 0 ? Math.round(x / width) : 0
			return index
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

		override auto() {
			this.index()
			return super.auto()
		}

	}
}
