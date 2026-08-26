namespace $.$$ {
	export class $yuf_sj_jammer_task_link extends $.$yuf_sj_jammer_task_link {
		override user_content() {
			return this.task_auto() ? [] : super.user_content()
		}

		override freq_range_formatted() {
			return super.freq_range_formatted()
				.replace('{min}', '' + (this.freq_min() ?? '?'))
				.replace('{max}', '' + (this.freq_max() ?? '?'))
		}
	}
}
