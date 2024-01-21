namespace $ {
	export class $nxr_entity_test_user extends $nxr_entity {
		defaults() {
			return {
				id: '',
				name: '',
				age: 22,
				talent_ids: [] as readonly string[]
			}
		}

		name(next?: string) { return this.value('name', next) }
		age(next?: number) { return this.value('age', next) }

		@ $mol_mem
		talent_ids(next?: readonly string[]) {
			return this.value('talent_ids', next) ?? []
		}

		@ $mol_action
		talent_add(id: string) {
			this.talent_ids([ ... this.talent_ids(), id ])
		}

		@ $mol_action
		talent_remove(id: string) {
			this.talent_ids(this.talent_ids().filter(target_id => target_id !== id))
		}

		@ $mol_mem
		talents() {
			return this.talent_ids().map(id => this.$.$nxr_entity_test_talent.factory(id))
		}

	}


}
