namespace $ {
	export class $yuf_sj_ui_device_store extends $yuf_ws_entity<readonly string[]> {
		override type() { return 'devices' }

		override defaults( raw?: [] ) {
			return [ ...raw ?? [] ] as readonly string[]
		}

		ids(next?: ReturnType<this['defaults']>) {
			return this.data(next) ?? []
		}

		@ $mol_mem_key
		by_id(id: string) {
			return this.$.$yuf_sj_ui_device_model.make({
				id: $mol_const(id),
				ws: () => this.ws(),
			})
		}

		@ $mol_mem_key
		version_min(type: typeof $yuf_sj_ui_device_type.Value) {
			return this.ids()
				.map(id => this.by_id(id).info())
				.filter(info => info.device_type() === type)
				.map(info => info.firmware_version())?.[0] ?? null
		}
	}
}
