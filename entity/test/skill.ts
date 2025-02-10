namespace $ {
	export class $yuf_entity_test_skill extends $yuf_entity_repo {
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
