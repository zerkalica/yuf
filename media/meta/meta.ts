namespace $ {
	type Key = [ type: string, url: string ]

	export class $yuf_media_meta extends $mol_object {
		protected media_size([ type, url ]: Key) {
			if (type === 'video') {
				const vid = this.$.$yuf_video_load(url)
				return new $mol_vector_2d(vid.videoWidth, vid.videoHeight)
			}

			if (type === 'image') {
				const pic = this.$.$yuf_picture_load(url)
				return new $mol_vector_2d(pic.width, pic.height)
			}

			throw new Error('Getting media size not supported', { cause : { type, url }})
		}

		@ $mol_mem_key
		size(key: Key): $mol_vector_2d<number> {
			const prev = $mol_wire_probe(() => this.size(key))

			return $mol_error_fence(() => this.media_size(key), e => e, p => prev ?? p)
		}
	}
}
