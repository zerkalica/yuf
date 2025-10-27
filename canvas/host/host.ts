namespace $ {
	export class $yuf_canvas_host extends $mol_object {
		@ $mol_mem
		native() {
			const ctx = this.$.$mol_dom_context
			return new ctx.OffscreenCanvas(4096, 4096)
		}

		context2D() {
			const context = this.native().getContext( '2d' )
			if (! context) throw new Error('Can\'t create canvas context')
			return context
		}

		protected _render_task = null as null | Promise<Blob>

		render_task(next?: Promise<Blob>) {
			if (next) this._render_task = next
			return this._render_task
		}
	}

}
