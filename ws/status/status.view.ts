namespace $.$$ {
	export class $yuf_ws_status extends $.$yuf_ws_status {

		override ws_error_content() {
			return this.ws().error_message() ? super.ws_error_content() : []
		}

		override title() { return this.status() }

		override status() {
			const ws = this.ws()
			if (ws.ready()) return 'open'
		
			if (ws.error_message()) return 'error'

			return 'connecting'
		}
		
	}
}
