namespace $.$$ {
	export class $yuf_sj_jammer_task_status extends $.$yuf_sj_jammer_task_status {
		
		override text() {
			const status = this.status()
			if (! status) return super.text()
			return this.dict()[status] || status
		}

		override mode_attr() {
			return this.status() ?? super.mode_attr()
		}
		
	}
}
