
namespace $.$$ {
	export class $yuf_sj_ui_device_updater_page extends $.$yuf_sj_ui_device_updater_page {


		@ $mol_action
		override upload(e?: Event) {
			const file = this.selected_file()
			if (! file) return null
			const type = this.firmware_type() as typeof $yuf_sj_ui_device_type.Value | ''
			if (! type) return null

			this.file_name(file.name)

			this.firmware().update({
				type,
				file,
			})
		}

		override form_content() {
			const progress = this.progress() ?? 0
			return progress < 1 ? super.form_content() : []
		}

		override progress_content() {
			const progress = this.progress()
			return progress !== null ? super.progress_content() : []
		}

		override reset_content() {
			const progress = this.progress() ?? 0
			if (progress < 100) return []
			if ( this.device_type() === 'JAMMER' && this.model().logout_supported() ) return []
			return super.reset_content()
		}

		@ $mol_mem
		protected success_reboot_task() {
			return new $mol_after_timeout(5000, $mol_wire_async(() => this.model().logout()))
		}

		@ $mol_mem
		override progress_status_content() {
			const type = this.device_type()
			const progress = this.progress() ?? 0

			if (progress < 100) {
				return [ this.progress_status_text().replace('{progress}', '' + progress) ]
			}

			if (type === 'JAMMER') {
				this.success_reboot_task()
				return [ this.success_jammer() ]
			}

			return [ this.success_module() ]

		}

		override info() {
			return this.file_name() + ' ('+ this.device_type() + ')'
		}

		override reset(e?: Event) {
			this.progress(null)
		}

	}
}
