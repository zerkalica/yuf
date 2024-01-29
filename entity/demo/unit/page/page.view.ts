namespace $.$$ {
	export class $yuf_entity_demo_unit_page extends $.$yuf_entity_demo_unit_page {
		override title(next?: string) {
			return this.model().title(next)
		}

		override menu_title() {
			return this.model().title()
		}

		override pages() {
			return super.pages().filter(el => (
				this.skills_enabled() || el !== this.Skill_list()
			))
		}

		skills_enabled() {
			return this.$.$mol_state_arg.value(Object.keys(this.skill_list_enabled_arg())[0])
		}

		override skill_list_enabled_arg() {
			return {
				yuf_entity_demo_unit_skills: '1'
			}
		}
	}
}
