namespace $.$$ {
	export class $yuf_ws_status extends $.$yuf_ws_status {

		override ws_error_content() {
			return this.error_message() ? super.ws_error_content() : []
		}

		override status() {
			const ws = this.ws()
			if (ws.error_message()) return 'error'
			if (ws.ready()) return 'open'
			return 'connecting'
		}

		override reset_error(e?: Event) {
			e && $mol_dom_event.wrap(e)?.prevented(true)
			this.ws().error(null)
		}

		override title_formatted() {
			const message = this.status_message()[this.status()] || this.status_message().error
			return super.title().replace('{status}', message)
		}
	}
}
