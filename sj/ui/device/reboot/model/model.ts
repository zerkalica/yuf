namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const vr = $mol_data_variant
	const cnst = $mol_data_const
	const arr = $mol_data_array

	const password_dto = rec({
		password_old: str,
		password_new: str,
	})

	export class $yuf_sj_ui_device_reboot_model extends $yuf_ws_entity<typeof password_dto.Value> {
		override type() { return 'password_change' }
		override device() {
			return this.id() ? [ this.id() ] : []
		}
		override defaults(raw?: {}) {
			return password_dto({
				password_old: '',
				password_new: '',
				...raw,
			})
		}
	}

}
