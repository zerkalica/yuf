namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const arr = $mol_data_array

	export const $yuf_sj_ui_network_route_model_dto = rec({
		destination: str,
		gateway: str,
		dev: opt(nul(str)),
	})

	export class $yuf_sj_ui_network_route_model extends $yuf_ws_entity<typeof $yuf_sj_ui_network_route_model_dto.Value> {
		override defaults( raw?: {} ) {
			return $yuf_sj_ui_network_route_model_dto({
				destination: '',
				gateway: '',
				dev: null,
				...raw,
			})
		}

		sdr() {
			return this.$.$yuf_sj_jammer_sdr_model.make({})
		}

		master() { return this.sdr().master() }

		destination(next?: string) { return this.value('destination', next) }
		gateway(next?: string) { return this.value('gateway', next) }
		dev(next?: string) { return this.value('dev', next) }
	}
}
