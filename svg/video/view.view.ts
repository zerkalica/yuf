namespace $.$$ {
	export class $yuf_svg_video_player extends $.$yuf_svg_video_player {
		
		override metadata_event(e: Event) {
			const target = e.target as HTMLVideoElement
            const height = target.videoHeight
            const width = target.videoWidth
			this.size([ width, height ])
		}

		@ $mol_mem
		override fullscreen(next?: boolean) {
			// @todo refactor video tiles to single tile
			const node = this.dom_node() ?? null

			return this.$.$yuf_browser_live.fullscreen_node(next ? node : next === false ? null : undefined) === node
		}

	}
}
