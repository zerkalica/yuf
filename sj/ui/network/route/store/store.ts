namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const arr = $mol_data_array

	const routes_dto = arr($yuf_sj_ui_network_route_model_dto)

	export class $yuf_sj_ui_network_route_store extends $yuf_ws_entity_store_fake<typeof $yuf_sj_ui_network_route_model_dto.Value> {
		override type() { return 'routes' }

		override defaults(raw?: []) {
			return routes_dto([ ... raw ?? [] ])
		}

		sdr() {
			return this.$.$yuf_sj_jammer_sdr_model.make({})
		}

		@ $mol_mem_key
		override by_id(id: string) {
			return this.$.$yuf_sj_ui_network_route_model.make({
				_id: id,
				ws: () => this.ws(),
				actual: (next) => this.row_data(id, next),
				sdr: () => this.sdr(),
			})
		}
	}
}
