namespace $.$$ {
	export class $yuf_camera_pane extends $.$yuf_camera_pane {
		
		@ $mol_action
		override canvas_file() {
			if (! this.visible() ) return null
			const video = this.video_enabled()

			const recorder = video ? this.recorder() : null
			const chunks = recorder?.flush() ?? [ this.canvas().blob() ]
			const type = recorder?.mime_type().split(';')?.[0]?.trim() ?? this.image_type()

			if (! chunks.length || ! chunks[0].size) {
				throw new Error('No image recorded')
			}

			const ext = type.split('/')?.[1]?.trim() ?? 'mp4'

			const moment = new $mol_time_moment()
			const name = this.file_name_template()
				.replace('{{date}}', moment.toString('YYYYMMDD_hhmmss'))
				.replace('{{ext}}', ext)

			return new File(chunks , name, {
				lastModified: moment.valueOf(),
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
			try {
				if (this.video_acceptable() && this.recorder().status() === 'recording') {
					this.video_enabled(true)
				}
			} catch (e) {
				$mol_fail_log(e)
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
