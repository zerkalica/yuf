namespace $.$$ {
	export class $yuf_sj_ui_device_reboot_form extends $.$yuf_sj_ui_device_reboot_form {
		
		override new_password_equal(field: string) {
			const new2 = this.value_str(field)
			if (! new2) return ''
			if (new2 === this.password_new()) return ''
			return super.new_password_equal(field)
		}

		@ $mol_mem_key
		override value_str( id: string, next?: string ): string {
			if (id === 'password_new' || id === 'password_new2') return this[id](next)
			return next ?? ''
		}

		override reset() {
			this.password_new2('')
			this.password_new('')
		}

		override submit_activate_fork(e: Event) {
			// prevent cancelling save task if other button pressed, while saving
			return $mol_wire_async(this).submit_activate(e)
		}
	}
}
