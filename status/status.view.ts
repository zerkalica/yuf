namespace $.$$ {
	export class $yuf_status extends $.$yuf_status {
		
		@ $mol_mem
		override icon_content() {
			const status = this.status()
			if ( status === '' ) return [ this.Icon_ok() ]
			if ( status === 'error' ) return [ this.Icon_error() ]
			return [ this.Icon_loading() ]
		}

		override mol_view_error() {
			return this.status() === 'loading' ? 'Promise' : null
		}

		override error_content() {
			return this.error_message() ? super.error_content() : []
		}

		override reset_error(e?: Event) {
			e && $mol_dom_event.wrap(e)?.prevented(true)
			this.error(null)
		}

		override status_formatted() {
			return this.status_message()?.[this.status()] ?? ''
		}

		override title_formatted() {
			const message = this.status_formatted() || this.status_message().error || ''
			return this.title().replace('{status}', message)
		}

		override status() {
			try {
				this.error()
				return ''
			} catch (e) {
				if (! $mol_promise_like(e)) return 'error'
				return 'loading'
			}
		}

		override error_message() {
			try {
				this.error()
				return ''
			} catch (e) {
				if ($mol_promise_like(e)) return ''
				return this.$.$mol_error_message(e)
			}
		}
	}
}
