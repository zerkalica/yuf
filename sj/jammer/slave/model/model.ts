namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const arr = $mol_data_array

	export const $yuf_sj_jammer_slave_model_dto = rec({
		uri: str,
	})

	export class $yuf_sj_jammer_slave_model extends $yuf_ws_entity<typeof $yuf_sj_jammer_slave_model_dto.Value> {
		override defaults( raw?: {} ) {
			return $yuf_sj_jammer_slave_model_dto({
				uri: '',
				...raw,
			})
		}

		uri(next?: string) { return this.value('uri', next) }
	}
}
