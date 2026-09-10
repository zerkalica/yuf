namespace $ {
	export function $yuf_media_size(image: CanvasImageSource): readonly [x: number, y: number] {
		if ( image instanceof VideoFrame ) return [
			image.displayWidth,
			image.displayHeight
		]

		if( image instanceof HTMLVideoElement) return [
			image.videoWidth,
			image.videoHeight,
		]
		
		if( image instanceof SVGImageElement ) return [
			image.width.baseVal.value,
			image.height.baseVal.value,
		]

		return [
			image.width,
			image.height,
		]
	}
}
