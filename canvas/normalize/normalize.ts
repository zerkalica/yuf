namespace $ {
	export function $yuf_canvas_normalize(this: $, src: Exclude<ImageBitmapSource, ImageData> | string) {
		let target: CanvasImageSource | undefined

		if (typeof src === 'string') {
			target = new this.$mol_dom_context.Image()
			target.src = src
		} else if (src instanceof Blob) {
			target = (
				$mol_wire_sync(this.$mol_dom_context) as unknown as {
					createImageBitmap(image: ImageBitmapSource, options?: ImageBitmapOptions): ImageBitmap
				}
			).createImageBitmap(src)
		} else target = src

		return target

	}
}
