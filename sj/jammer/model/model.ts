namespace $ {
	export class $yuf_sj_jammer_model extends $yuf_sj_ui_device_model {
		@ $mol_mem
		sdr() {
			return this.$.$yuf_sj_jammer_sdr_model.make({
				ws: () => this.ws(),
				id: () => this.id(),
			})
		}

		override auto(): unknown[] {
			if (! this.session().logged()) return []

			return $mol_wire_race(
				() => super.auto(),
				() => this.sdr().band_limit_hard(),
				() => this.sdr().bands(),
				() => this.tasks().ids(),
				() => this.devices().ids(),
			)
		}

		@ $mol_mem
		tasks() {
			return this.$.$yuf_sj_jammer_task_store.make({
				ws: () => this.ws(),
				id: () => this.id(),
				sdr: () => this.sdr(),
			})
		}


		@ $mol_mem_key
		rules(access_type: 'allow' | 'deny') {
			return this.$.$yuf_sj_jammer_rule_store.make({
				access_type: $mol_const(access_type),
				ws: () => this.ws(),
				id: () => this.id(),
				sdr: () => this.sdr(),
			})
		}

		@ $mol_mem
		routes() {
			return this.$.$yuf_sj_ui_network_route_store.make({
				ws: () => this.ws(),
				id: () => this.id(),
				sdr: () => this.sdr(),
			})
		}

	}
}

