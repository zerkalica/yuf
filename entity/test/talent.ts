namespace $ {
	export class $nxr_entity_test_talent extends $nxr_entity {
		defaults() {
			return {
				id: '',
				title: '',
				amount: 0,
			}
		}
		title(next?: string) { return this.value('title', next) }
		amount(next?: number) { return this.value('amount', next) }
	}
}
