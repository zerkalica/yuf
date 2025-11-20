namespace $ {
	export function $yuf_picture_load_async(this: $, src: string) {
		return new Promise<HTMLImageElement>((done, fail) => {
			const image = new this.$.$mol_dom.Image
			image.src = src
			image.onload = () => { done(image) }
			image.onerror = event => {
				let err = typeof event === 'string'
					? new Error(event)
					: ( event as ErrorEvent ).error as (Error | undefined)

				debugger
				if ( ! ( err instanceof Error ) ) err = new Error('Image load error', { cause: { event, src }})

				fail(err)
			}
		})
	}

	export function $yuf_picture_load(this: $, uri: string) {
		return $mol_wire_sync(this).$yuf_picture_load_async(uri)
	}

}
