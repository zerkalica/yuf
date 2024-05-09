namespace $.$$ {
	export class $yuf_ws_status extends $.$yuf_ws_status {
		@ $mol_mem
		override ws_status() {
			return this.ws().status()
		}

		override ws_error() {
			return this.ws().error_last()?.message ?? ''
		}

		override error() {
			let err = super.error()
			if (!err) err = this.ws_error()
			return err
		}

		id() {
			return this.ws().id() ?? ''
		}

		override click() {
			this.ws().restart()
		}

		override hint() {
			const id = this.id()
			const error = this.ws_error()
			const status = this.ws_status()

			const hint = this.hint_prefix()
				.replace('{socket_id}', id)
				.replace('{ws_status}', this.statuses()[status] || status)

			return `${hint}${(error ? ` [${error}]` : '')}`
		}

	}
}
