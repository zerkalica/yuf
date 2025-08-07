namespace $.$$ {
	export class $yuf_camera_pane extends $.$yuf_camera_pane {
		
		override camera_click( event? : Event ) {
			event && $mol_dom_event.wrap(event).prevented(true)
			const blob = this.canvas().blob()

			const date_str = new $mol_time_moment().toString('YYYYMMDD_hhmmss')
			const name = this.file_name_template().replace('{{date}}', date_str)

			const file = new File([ blob ], name, {
				lastModified: new Date().getTime(),
				type: blob.type
			} )

			this.file(file)
			return null
		}

	}
}
