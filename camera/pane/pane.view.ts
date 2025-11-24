namespace $.$$ {
	export class $yuf_camera_pane extends $.$yuf_camera_pane {
		
		@ $mol_action
		override canvas_file() {
			if (! this.visible() ) return null
			const video = this.video_enabled()

			const chunks = video ? this.recorder().flush() : [ this.canvas().blob() ]
			if (! chunks.length || ! chunks[0].size) {
				throw new Error('No image recorded')
			}

			const type = video ? this.image_type_video() : this.image_type()
			const file_template = video ? this.file_name_template_video() : this.file_name_template()

			const date_str = new $mol_time_moment().toString('YYYYMMDD_hhmmss')
			const name = file_template.replace('{{date}}', date_str)

			return new File(chunks , name, {
				lastModified: new Date().getTime(),
				type
			})
		}

		override video_controls() {
			return this.video_acceptable() ? super.video_controls() : []
		}

		@ $mol_mem
		visible(next?: boolean): boolean {
			if (next === undefined) new $mol_after_timeout(0, () => this.visible(true))
			return next ?? false
		}

		override auto() {
			this.visible()
			this.video_enabled()
			if (this.video_acceptable() && this.recorder().status() === 'recording') {
				this.video_enabled(true)
			}
			return super.auto()
		}

		override camera_click( event? : Event ) {
			event && $mol_dom_event.wrap(event).prevented(true)

			try {
				const file = this.canvas_file()
				this.file(file)
				this.status([ null ])
			} catch (error) {
				Promise.resolve().then( ()=> this.status([ error ]) )
				$mol_fail_hidden( error )
			}

			return null
		}

	}
}
