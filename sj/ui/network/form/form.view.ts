namespace $.$$ {
	export class $yuf_sj_ui_network_form extends $.$yuf_sj_ui_network_form {
		
		override ip_edit_enabled() {
			return this.ip_type() !== 'dhcp'
		}

		override required_dhcp(key: string) {
			if (this.ip_type() === 'dhcp') return ''
			return this.required(key)
		}

		need_actualize() {
			return this.ip_type() === 'dhcp' && this.changed()
		}

		override ip_content() { return this.need_actualize() ? [] : super.ip_content() }
		override dhcp_actualize_content() {
			return this.need_actualize() ? super.dhcp_actualize_content() : []
		}

		override submit_activate_fork(e: Event) {
			// prevent cancelling save task if other button pressed, while saving
			$mol_wire_async(this).submit_activate(e)
		}

		@ $mol_mem
		override ip_type(next?: string) {
			if (next === '') next = undefined
			return this.value_str('ip_type', next) ?? 'dhcp'
		}

		@ $mol_action
		reset_dhcp_fields() {
			const fields = ['ip', 'gateway', 'dns'] as const

			for (const field of fields) {
				if (this.value_str(field) === this.model()[field]() ) continue
				this.value_str(field, '')
			}
		}

		override save(e?: Event) {
			try {
				if (this.ip_type() === 'dhcp') this.reset_dhcp_fields()
				super.save(e)
			} catch (error) {
				if (
					error instanceof Error
					&& error.message === $mol_rest_code[$mol_rest_code['Request Timeout']]
				) {
					this.reset()
					this.done(true)
				}
				$mol_fail_hidden(error)
			}
		}

	}
}
