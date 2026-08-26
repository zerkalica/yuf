namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const vr = $mol_data_variant
	const cnst = $mol_data_const
	const arr = $mol_data_array

	export const $yuf_sj_ui_network_model_type_dto = vr(
		cnst('static' as const),
		cnst('dhcp' as const),
	)

	const network_settings_dto = rec({
		network_type: $yuf_sj_ui_network_model_type_dto,
		ip: opt(str),
		gateway: opt(str),
		dns: opt(str),
		dns2: opt(str),
	})

	export class $yuf_sj_ui_network_model extends $yuf_ws_entity<typeof network_settings_dto.Value> {
		override type() { return 'network'}

		override device() {
			return this.id() ? [ this.id() ] : []
		}

		override defaults(raw?: {}) {
			return network_settings_dto({
				network_type: 'dhcp',
				ip: '',
				gateway: '',
				dns: '',
				dns2: '',
				...raw,
			})
		}

		ip_type(next?: typeof $yuf_sj_ui_network_model_type_dto.Value) {
			return this.value('network_type', next) ?? 'dhcp'
		}

		ip(next?: string) { return this.value('ip', next) }
		gateway(next?: string) { return this.value('gateway', next) }
		dns(next?: string) { return this.value('dns', next) }
		dns2(next?: string) { return this.value('dns2', next) }
	}

}
