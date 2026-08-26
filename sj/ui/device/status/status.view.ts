namespace $.$$ {
	export class $yuf_sj_ui_device_status extends $.$yuf_sj_ui_device_status {
		
		override text() {
			const status = this.value()
			if (! status) return super.text()
			return this.dict()[status] || status
		}

		override mode_attr() {
			return this.value() ?? super.mode_attr()
		}
		
	}
}
