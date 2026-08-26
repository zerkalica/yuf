namespace $.$$ {
	export class $yuf_sj_jammer_rule_icon extends $.$yuf_sj_jammer_rule_icon {
		
		override path() {
			return this.status_icon()[this.status()]?.path() ?? super.path()
		}
		
	}
}
