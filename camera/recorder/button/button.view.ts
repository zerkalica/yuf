namespace $.$$ {
	export class $yuf_camera_recorder_button extends $.$yuf_camera_recorder_button {
		
		override hint() {
			return this.status_message()[this.recording_status()] || this.status_message()['inactive']
		}

		override status(next?: readonly any[] | null) {
			if ($mol_promise_like(next?.[0])) return next
			return this.error_packed(next as [Error] | null) ?? []
		}

		override recorder_status_next() {
			const cur = this.recording_status()
			if (cur === 'inactive' || cur === 'paused') return 'recording'
			return 'paused'
		}

		@ $mol_action
		recorder_status_next_grab() {
			return this.recorder_status_next()
		}

		override click(e?: Event) {
			const next = this.recorder_status_next_grab()
			this.recording_status(next)
		}

	}
}
