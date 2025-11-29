namespace $ {

	enum media_error_code {
		MEDIA_ERR_UNKNOWN = 0,
    	MEDIA_ERR_ABORTED = 1,
    	MEDIA_ERR_NETWORK = 2,
    	MEDIA_ERR_DECODE = 3,
    	MEDIA_ERR_SRC_NOT_SUPPORTED = 4
	}

	export function $yuf_video_load_async(this: $, src: string) {
		return new Promise<HTMLVideoElement>((done, fail) => {
			const node = this.$mol_dom.document.createElement('video')
			node.src = src
			node.onerror = (event) => {
				const code = media_error_code[node.error?.code ?? 0] || media_error_code[media_error_code.MEDIA_ERR_UNKNOWN]
				const cause = { message: node.error?.message, src, event }

				const error = new Error(code, { cause } )
				fail(error)
			}

			node.addEventListener('loadedmetadata', () => done(node))
		})
	}

	export function $yuf_video_load(this: $, src: string) {
		return $mol_wire_sync(this).$yuf_video_load_async(src)
	}
}
