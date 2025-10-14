namespace $ {
	export class $yuf_ws_entity_store_fake<Item extends {}> extends $yuf_entity2_store_fake<Item> {
		type() { return '' }
		query() { return {} as Record<string, string | null> }

		device() {
			return this.id() ? [ this.id() ] : []
		}

		@ $mol_mem
		signature() {
			const query = this.query()
			const device = this.device()

			return {
				type: this.type(),
				id: this.id() || undefined,
				query: Object.keys(query).length ? query : undefined,
				device: device.length ? device : undefined,
			}
		}

		ws() { return this.$.$yuf_ws_statefull._ }

		override actual(next?: Partial<ReturnType<this['defaults']>> | null) {
			this.propagate()
			return this.ws().data<Partial<ReturnType<this['defaults']>>>(this.signature(), next)
		}

		override toString() { return JSON.stringify(this.signature()) }

		@ $mol_mem_key
		override by_id(id: string) {
			return this.$.$yuf_ws_entity.make({
				id: $mol_const(id),
				ws: () => this.ws(),
				device: () => this.device(),
				actual: (next) => this.row_data(id, next)
			})
		}
	}

}
