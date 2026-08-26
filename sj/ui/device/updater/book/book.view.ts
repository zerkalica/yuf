namespace $.$$ {
	export class $yuf_sj_ui_device_updater_book extends $.$yuf_sj_ui_device_updater_book {
		
		override dev_list_content() {
			return this.firmware_type() === 'JAMMER_MODULE' ? super.dev_list_content() : []
		}

		override Close_main() {
			return this.firmware_type() === 'JAMMER_MODULE' ? null : super.Close_main()
		}
		
	}
}
