namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const arr = $mol_data_array

	const slaves_dto = arr($yuf_sj_jammer_slave_model_dto)

	export class $yuf_sj_jammer_slave_store extends $yuf_ws_entity_store_fake<typeof $yuf_sj_jammer_slave_model_dto.Value> {
		override type() { return 'slaves' }

		override defaults(raw?: []) {
			return slaves_dto([ ... raw ?? [] ])
		}

		@ $mol_mem_key
		override by_id(id: string) {
			return this.$.$yuf_sj_jammer_slave_model.make({
				_id: id,
				ws: () => this.ws(),
				actual: (next) => this.row_data(id, next)
			})
		}
	}
}
