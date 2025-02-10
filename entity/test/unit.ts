namespace $ {
	export class $yuf_entity_test_unit extends $yuf_entity_repo {
		defaults() {
			return {
				id: '',
				title: 'tank',
				skill_ids: [] as readonly string[],
			}
		}
		title(next?: string) { return this.value('title', next) }

		skill_ids(next?: readonly string[]) { return this.value('skill_ids', next) }

		@ $mol_action
		skill_add(id: string) {
			this.skill_ids([ ... this.skill_ids(), id ])
		}

		@ $mol_action
		skill_remove(id: string) {
			this.skill_ids(this.skill_ids().filter(target_id => target_id !== id))
		}
	}
}
