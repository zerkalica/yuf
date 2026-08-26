namespace $ {

	export class $yuf_sj_jammer_task_store extends $yuf_ws_entity_store {
		override type() { return 'tasks' }

		sdr() {
			return this.$.$yuf_sj_jammer_sdr_model.make({})
		}

		@ $mol_mem_key
		override by_id(id: string) {
			return this.$.$yuf_sj_jammer_task_model.make({
				_id: id,
				ws: () => this.ws(),
				sdr: () => this.sdr(),
			})
		}

	}
}
