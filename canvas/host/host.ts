namespace $ {
	type Context<Id extends OffscreenRenderingContextId> = Id extends '2d' ? OffscreenCanvasRenderingContext2D
		: Id extends 'bitmaprenderer' ? ImageBitmapRenderingContext
		: Id extends 'webgl' ? WebGLRenderingContext
		: Id extends 'webgl2' ? WebGL2RenderingContext
		: never

	export type $yuf_canvas_host_source = Exclude<ImageBitmapSource, ImageData> | string

	export class $yuf_canvas_host extends $mol_object {
		readonly native!: OffscreenCanvas

		@ $mol_action
		static from_source(src?: $yuf_canvas_host_source | readonly [number, number], prev?: $yuf_canvas_host | null) {
			const normalized = ! src || src instanceof Array ? null : this.$.$yuf_canvas_normalize(src)
			const [ w, h ] = normalized ? this.$.$yuf_media_size(normalized) : ( src instanceof Array ? src : [ 0, 0 ] )

			if (prev) {
				prev.native.width = w
				prev.native.height = h
			} else {
				const native = new this.$.$mol_dom_context.OffscreenCanvas(w, h)
				prev = this.$.$yuf_canvas_host.make({ native })
			}

			if (normalized) prev.d2.drawImage(normalized, 0, 0, w, h)

			return prev
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

		blob(opts: ImageEncodeOptions = { quality: .99, type: 'image/jpeg' }) {
			return $mol_wire_sync(this.native).convertToBlob(opts)
		}

		clone() { return this.$.$yuf_canvas_host.from_source(this.native) }
	}

}
