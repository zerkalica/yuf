namespace $ {
	export class $yuf_ws_entity<Data = unknown> extends $yuf_entity2<Data> {
		type() { return '' }
		query() { return {} as Record<string, string | null> }
		device() { return [] as readonly string[] }

		@ $mol_mem
		signature(): Record<string, unknown> {
			const query = this.query()
			const device = this.device()

			let id = this.id() || undefined
			if (id && device.includes(id)) id = undefined

			return {
				type: this.type(),
				id,
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
