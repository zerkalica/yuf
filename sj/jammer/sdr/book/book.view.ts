namespace $.$$ {
	export class $yuf_sj_jammer_sdr_book extends $.$yuf_sj_jammer_sdr_book {
		
		override slave_content() {
			return this.model().master() ? super.slave_content() : []
		}
		
	}
}
