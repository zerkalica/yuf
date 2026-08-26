namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const vr = $mol_data_variant
	const cnst = $mol_data_const
	const arr = $mol_data_array

	export const $yuf_sj_ui_description_model_dto = rec({
		name: opt(str),
		description: opt(str),
	})

	export class $yuf_sj_ui_description_model extends $yuf_ws_entity<typeof $yuf_sj_ui_description_model_dto.Value> {
		override type() { return 'description'}

		override device() {
			return this.id() ? [ this.id() ] : []
		}

		override defaults(raw?: {}) {
			return $yuf_sj_ui_description_model_dto({
				name: '',
				description: '',
				...raw,
			})
		}

		name(next?: string) { return this.value('name', next) }
		description(next?: string) { return this.value('description', next) }
	}
	

}
