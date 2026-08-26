namespace $.$$ {
	export class $yuf_sj_jammer_slave_page extends $.$yuf_sj_jammer_slave_page {
		
		override remove_event(id: string, e?: Event) {
			this.model().by_id(id).data(null)
		}
		
	}
}
