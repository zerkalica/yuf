namespace $.$$ {
	export class $yuf_sj_ui_device_updater_form extends $.$yuf_sj_ui_device_updater_form {

		@ $mol_mem
		override version_formatted() {
			const type = this.firmware_type()
			if (! type) return this.firmware_type_select_message()

			const version = type === 'JAMMER'
				? this.version()
				: this.version_min(type)

			return version
		}

		@ $mol_mem
		override version_latest_formatted() {
			const type = this.firmware_type()
			if (! type) return ''

			let latest = 'n/a'

			try {
				if (type) latest = this.version_latest(type)
			} catch (e) {
				if ($mol_promise_like(e)) $mol_fail_hidden(e)
				$mol_fail_log(e)
			}

			return super.version_latest_formatted().replace('{version_latest}', latest)
		}

		override selected_file() {
			 return this.selected_files()?.[0] ?? null
		}

		override selected_file_name() {
			return this.selected_file()?.name ?? null
		}

		override required_firmware_type() {
			return this.firmware_type() ? '' : super.required_firmware_type()
		}

		@ $mol_mem
		override selected_files(next?: readonly File[]) {
			this.firmware_type()
			return next ?? []
		}

		override required_selected_file() {
			return this.selected_file() ? '' : super.required_selected_file()
		}

		override form_invalid() {
			if (! this.firmware_type() ) return this.message_empty_firmware_type()
			if (! this.selected_files().length) return this.message_empty_firmware()
			return super.form_invalid()
		}

		override selected_file_content() {
			if (! this.selected_file_name()) return []
			return super.selected_file_content()
		}

		@ $mol_mem
		override result( next?: string | Error ) {

			this.firmware_type()
			this.selected_file()
			this.progress(null)

			if (next instanceof Error) next = this.errors()[next.message] || next.message || this.form_invalid()

			return next ?? ''
		}

	}
}
