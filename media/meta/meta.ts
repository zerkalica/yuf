namespace $ {
	type Key = [ type: string, url: string ]

	export class $yuf_media_meta extends $mol_object {
		protected media_size([ type, url ]: Key)  {
			let el
			if (type === 'video') el = this.$.$yuf_video_load(url)
			if (type === 'image') el = this.$.$yuf_picture_load(url)
			const pnt = ! el ? null : $yuf_media_size(el)

			if (! pnt ) throw new Error('Getting media size not supported', { cause : { type, url }})

			return new $mol_vector_2d(pnt[0], pnt[1])
		}

		@ $mol_mem_key
		size(key: Key, reset?: null) { return this.media_size(key) }
	}
}
