namespace $.$$ {
	export class $yuf_ws_status extends $.$yuf_ws_status {

		override ws_error_content() {
			return this.error_message() ? super.ws_error_content() : []
		}

		override status() {
			try {
				return super.status()
			} catch (e) {
				if (! $mol_promise_like(e)) return 'error'
				$mol_fail_hidden(e)
			}
		}

		override title_formatted() {
			const message = this.status_message()[this.status()] || this.status_message().error
			return super.title().replace('{status}', message)
		}
	}
}
