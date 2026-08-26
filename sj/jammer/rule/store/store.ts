namespace $ {
	export class $yuf_sj_jammer_rule_store extends $yuf_ws_entity_store {

		override type() { return 'rules' }

		@ $mol_mem
		override query() {
			return {
				access: this.access_type()
			}
		}

		sdr() {
			return this.$.$yuf_sj_jammer_sdr_model.make({})
		}

		access_type() {
			return 'allow' as typeof $yuf_sj_jammer_rule_model_status_dto.Value
		}

		@ $mol_action
		override id_add(id: string) {
			if ( this.by_id(id).access() === this.access_type() ) {
				super.id_add(id)
			}
		}

		@ $mol_mem_key
		override by_id(id: string) {
			return this.$.$yuf_sj_jammer_rule_model.make({
				_id: id,
				ws: () => this.ws(),
				sdr: () => this.sdr(),
			})
		}
	}

}
