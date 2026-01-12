namespace $ {
	export const $yuf_karaoke_model_data = $mol_data_record({
		title: $mol_data_string,
		audio_url: $mol_data_string,
		lyrics: $mol_data_string,
	})

	export class $yuf_karaoke_model extends $yuf_ws_entity<typeof $yuf_karaoke_model_data.Value> {
		override type() {
			return 'karaoke'
		}

		override defaults( raw?: {} ) {
			return $yuf_karaoke_model_data({
				title: '',
				audio_url: '',
				lyrics: '',
				...raw,
			})
		}

		title(next?: string) {
			const a= this.value('title', next)

			return a
		}

		audio_url(next?: string) {
			return this.value('audio_url', next)
		}

		lyrics(next?: string) {
			return this.value('lyrics', next)
		}

		@ $mol_mem
		protected lyrics_blob() {
			return new Blob([ this.lyrics() ], { type: 'text/vtt' })
		}

		@ $mol_mem
		lyrics_url() {
			return this.$.$yuf_url_object.from_blob(this.lyrics_blob()).url
		}
	}

}
