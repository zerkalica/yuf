namespace $.$$ {
	export class $yuf_svg_video_player extends $.$yuf_svg_video_player {
		
		override metadata_event(e: Event) {
			const target = e.target as HTMLVideoElement
            const height = target.videoHeight
            const width = target.videoWidth
			this.size([ width, height ])
		}

	}
}
