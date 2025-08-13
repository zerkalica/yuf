namespace $.$$ {
	export class $yuf_catalog_demo_animals extends $.$yuf_catalog_demo_animals {
		
		override extra_param_name() {
			return `${this.param()}_${super.extra_param_name()}`
		}

		extra_enabled() {
			return this.$.$mol_state_arg.value(this.extra_param_name()) !== null
		}

		override pages() {
			return [
				... super.pages(),
				... this.extra_enabled() ? this.extra_content() : [],
			]
		}
		
	}
}
