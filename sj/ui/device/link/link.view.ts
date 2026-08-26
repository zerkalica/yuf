namespace $.$$ {
	export class $yuf_sj_ui_device_link extends $.$yuf_sj_ui_device_link {

		override name_id() {
			return this.name().trim() || `# ${this.id()}`
		}

		override serial_content() { return this.serial() ? super.serial_content() : [] }

		override device_type_formatted() {
			return this.device_type().replace('JAMMER_MODULE', 'MODULE')
		}
	}
}
