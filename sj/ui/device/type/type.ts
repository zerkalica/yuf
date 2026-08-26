namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const vr = $mol_data_variant
	const cnst = $mol_data_const
	const arr = $mol_data_array

	export const $yuf_sj_ui_device_type = vr(
		cnst('SDR' as const),
		cnst('JAMMER' as const),
		cnst('JAMMER_MODULE' as const),
	)

	export const $yuf_sj_ui_device_type_status = vr(
		cnst('ok' as const), // ok
		cnst('err' as const), // error
		cnst('na' as const), // not available
		cnst('reset-planned' as const),
		cnst('resetting' as const),
	)
}
