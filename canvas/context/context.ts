namespace $ {
	type Context<Id extends OffscreenRenderingContextId> = Id extends '2d' ? OffscreenCanvasRenderingContext2D
		: Id extends 'bitmaprenderer' ? ImageBitmapRenderingContext
		: Id extends 'webgl' ? WebGLRenderingContext
		: Id extends 'webgl2' ? WebGL2RenderingContext
		: never

	export class $yuf_canvas_context extends $mol_object {
		readonly native!: OffscreenCanvas

		static from_size(size: readonly [number, number]) {
			return this.$.$yuf_canvas_context.make({
				native: new this.$.$mol_dom_context.OffscreenCanvas(size[0], size[1])
			})
		}

		context<Id extends OffscreenRenderingContextId>(type: Id) {
			const ctx = this.native.getContext(type) as Context<Id> | null
			if (! ctx ) throw new Error('Can\'t get context from canvas', { cause: { type }})
			return ctx
		}

		size(next?: readonly [number, number]) {
			if (next) {
				this.native.width = next[0]
				this.native.height = next[1]
			}
			return [ this.native.width, this.native.height ] as const
		}

		get d2() { return this.context('2d') }
		get bitmaprenderer() { return this.context('bitmaprenderer') }
		get webgl() { return this.context('webgl') }
		get webgl2() { return this.context('webgl2') }
		get webgpu() { return this.context('webgpu') }
	}

}
