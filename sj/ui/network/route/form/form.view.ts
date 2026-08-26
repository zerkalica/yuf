namespace $.$$ {
	export class $yuf_sj_ui_network_route_form extends $.$yuf_sj_ui_network_route_form {

		override save(e?: Event) {
			try {
				super.save(e)
			} catch (error) {
				if (
					error instanceof Error
					&& error.message === $mol_rest_code[$mol_rest_code['Request Timeout']]
				) {
					return this.timeout_success(true)
				}

				$mol_fail_hidden(error)
			}
		}

		override result( next?: string | Error ) {
			return super.result(next) + (this.timeout_success() ? ('. ' + this.message_timeout()) : '')
		}
	}
}
