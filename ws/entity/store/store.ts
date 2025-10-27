namespace $ {

	export class $yuf_ws_entity_store<Item = string> extends $yuf_entity2_store<Item> {
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

		ws() { return this.$.$mol_one.$yuf_ws_statefull }

		override actual(next?: Partial<ReturnType<this['defaults']>> | null, refresh?: 'refresh') {
			this.propagate()
			return this.ws().data<Partial<ReturnType<this['defaults']>>>(this.signature(), next, refresh)
		}

		override toString() { return JSON.stringify(this.signature()) }
	}
}
