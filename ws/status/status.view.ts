namespace $.$$ {
	export class $yuf_ws_status extends $.$yuf_ws_status {

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
	}
}
