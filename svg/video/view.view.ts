namespace $.$$ {
	export class $yuf_svg_video_player extends $.$yuf_svg_video_player {
		override metadata_event(e: Event) { this.info(e.target as HTMLVideoElement) }

		@ $mol_mem
		override fullscreen(next?: boolean) {
			// @todo refactor video tiles to single tile
			const node = this.dom_node() ?? null

			return this.$.$yuf_browser_live.fullscreen_node(next ? node : next === false ? null : undefined) === node
		}

	}
}
