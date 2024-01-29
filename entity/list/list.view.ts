namespace $.$$ {
	export class $yuf_entity_list extends $.$yuf_entity_list {
		override model(id: string) {
			return this.factory().factory(id)
		}

		override add() {
			const model = this.factory().add()
			this.spread(model.id())
		}

		override remove(id: string) {
			this.factory().remove(id)
			if (this.spread() === id) this.spread(null)
		}

		override spread_ids() {
			return this.factory().search({})
		}

		// override menu_tools() {
		// 	const has_close_args = Object.keys(this.close_arg()).length > 0
		// 	return super.menu_tools().filter(el => (
		// 		has_close_args || el !== this.Close()
		// 	))
		// }
	}
}
