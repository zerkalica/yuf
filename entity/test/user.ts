namespace $ {
	export class $yuf_entity_test_user extends $yuf_entity_repo {
		defaults() {
			return {
				id: '',
				name: 'New user',
				age: 22,
				unit_ids: [] as readonly string[]
			}
		}

		name(next?: string) { return this.value('name', next) }
		age(next?: number) { return this.value('age', next) }

		@ $mol_mem
		unit_ids(next?: readonly string[]) {
			return this.value('unit_ids', next) ?? []
		}

		@ $mol_action
		unit_add(id: string) {
			this.unit_ids([ ... this.unit_ids(), id ])
		}

		@ $mol_action
		unit_remove(id: string) {
			this.unit_ids(this.unit_ids().filter(target_id => target_id !== id))
		}
	}


}
