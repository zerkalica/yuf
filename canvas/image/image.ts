namespace $ {
	export class $yuf_canvas_image extends $yuf_canvas_blob {
		node() {
			return null as null | Element
		}

		static sizes( image: Exclude< CanvasImageSource, VideoFrame > ) {
		
			if( image instanceof HTMLVideoElement ) return [
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

		override render_options() {
			const node = this.node() as Exclude< CanvasImageSource, VideoFrame >

			return {
				...super.render_options(),
				node,
			}
		}

		override async draw( { context, canvas, node }: ReturnType<typeof this.render_options> ) {
			const [ w ,h ] = $yuf_canvas_image.sizes(node)

			canvas.width = w
			canvas.height = h

			context.fillStyle = 'rgb(255, 255, 255)'
			context.fillRect(0, 0, w, h)

			context.drawImage(node, 0, 0, w, h)
		}
	}
}
