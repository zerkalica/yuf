namespace $.$$ {
	export class $yuf_sj_jammer_task_page extends $.$yuf_sj_jammer_task_page {
		override user_content() {
			return this.task_auto() ? [] : super.user_content()
		}
	}
}
