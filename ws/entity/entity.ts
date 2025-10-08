namespace $ {
	export class $yuf_ws_entity extends $yuf_entity2 {
		type() { return '' }
		query() { return {} as Record<string, string | null> }
		device() { return [] as readonly string[] }

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
	}
}
