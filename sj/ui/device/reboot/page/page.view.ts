namespace $.$$ {
	export class $yuf_sj_ui_device_reboot_page extends $.$yuf_sj_ui_device_reboot_page {
		override save_password(e?: Event) {
			this.model().password({
				password_new: this.password_new(),
				password_old: this.password_old(),
			})

			this.reset()
		}

		override reboot(e?: Event) {
			const model = this.model()
			model.reboot()
		}
	}
}
