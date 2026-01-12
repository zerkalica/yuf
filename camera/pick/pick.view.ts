namespace $.$$ {
	export class $yuf_camera_pick extends $.$yuf_camera_pick {

		override close_click( event? : Event ) {
			event && $mol_dom_event.wrap(event).prevented(true)
			this.showed( false )
		}

		override cam_files(next?: readonly File[]) {
			const file = this.files(next)
			if (next) this.showed(false)

			return file ?? null
		}

	}
}
