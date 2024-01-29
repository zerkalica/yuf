namespace $.$$ {
	export class $yuf_entity_demo_user_page extends $.$yuf_entity_demo_user_page {
		override name(next?: string) {
			return this.model().name(next)
		}

		override menu_title() {
			return this.model().name()
		}

		override pages() {
			return super.pages().filter(el => (
				this.units_enabled() || el !== this.Unit_list()
			))
		}

		units_enabled() {
			return this.$.$mol_state_arg.value(Object.keys(this.unit_list_enabled_arg())[0])
		}

		override unit_list_enabled_arg() {
			return {
				yuf_entity_demo_user_units: '1'
			}
		}
		override unit_list_disabled_arg() {
			return {
				yuf_entity_demo_user_units: null
			}
		}
	}
}
