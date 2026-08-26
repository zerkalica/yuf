namespace $.$$ {
	export class $yuf_sj_ui_uptime extends $.$yuf_sj_ui_uptime {
		
		override title() {
			return super.title().replace('{formatted_date}', this.formatted_date())
		}
		
	}
}
