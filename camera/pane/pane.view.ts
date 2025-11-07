namespace $.$$ {
	export class $yuf_camera_pane extends $.$yuf_camera_pane {
		
		@ $mol_action
		override canvas_file() {

			const blob = this.visible() ? this.canvas().blob() : null
			if (! blob) return null

			const date_str = new $mol_time_moment().toString('YYYYMMDD_hhmmss')
			const name = this.file_name_template().replace('{{date}}', date_str)

			return new File([ blob ], name, {
				lastModified: new Date().getTime(),
				type: blob.type
			} )
		}

		@ $mol_mem
		visible(next?: boolean): boolean {
			if (next === undefined) new $mol_after_timeout(0, () => this.visible(true))
			return next ?? false
		}

		override auto() {
			this.visible()
			return super.auto()
		}

		override camera_click( event? : Event ) {
			event && $mol_dom_event.wrap(event).prevented(true)

			this.file(this.canvas_file())
			return null
		}

	}
}
