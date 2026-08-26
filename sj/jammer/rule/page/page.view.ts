namespace $.$$ {
	export class $yuf_sj_jammer_rule_page extends $.$yuf_sj_jammer_rule_page {
		@ $mol_mem
		override title() {
			const model = this.model()
			return [
				'#' + model.id(),
				model.access(),
				model.created_at().toString('DD.MM.YY hh:mm:ss'),
			].join(' | ')
		}

		override remove_content() {
			return this.model().sdr().master() ? super.remove_content() : []
		}
		
	}
}
