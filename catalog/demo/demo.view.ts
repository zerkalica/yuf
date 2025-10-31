namespace $.$$ {
	export class $yuf_catalog_demo_user_catalog extends $.$yuf_catalog_demo_user_catalog {
		
		override filter_param_name() {
			return this.param_base() + '_' + super.filter_param_name()
		}

		override age_param_name() {
			return this.param_base() + '_' + super.age_param_name()
		}

		override param() {
			return `${this.param_base()}_${super.param()}`
		}

		@ $mol_mem
		override age_from(next?: number) {
			return Number(this.$.$mol_state_arg.value(
				this.param_base() + '_age_from',
				next === undefined ? next : ! next ? null : String(next)
			))
		}

		filter_enabled() {
			return this.$.$mol_state_arg.value(this.filter_param_name()) !== null
		}

		override pages() {
			return [
				... super.pages(),
				... this.filter_enabled() ? this.filter_content() : [],
			]
		}

		override age_enabled() {
			return this.$.$mol_state_arg.value(this.age_param_name()) !== null
		}
		
	}


	export class $yuf_catalog_demo_user_info extends $.$yuf_catalog_demo_user_info {
		override age_param_name() {
			return this.param_base() + '_' + super.age_param_name()
		}

		age_enabled() {
			return this.$.$mol_state_arg.value(this.age_param_name()) !== null
		}

		override age_content() {
			return this.age_enabled() ? super.age_content() : []
		}

		override menu_title() { return super.menu_title().replace('{id}', this.id()) }

		override friends_content() {
			return this.$.$mol_state_arg.value(this.friends_param_name()) !== null ? super.friends_content() : []
		}

		override friends_title() {
			return super.friends_title().replace('{id}', this.id())
		}
	}

	export class $yuf_catalog_demo_user_link extends $.$yuf_catalog_demo_user_link {
		override age_content() {
			return this.age_enabled() ? super.age_content() : []
		}
	}
}
