namespace $ {
	export class $yuf_sj_jammer_task_model_mock extends $yuf_sj_jammer_task_model {

		pick_status() {
			return $mol_array_lottery($yuf_sj_jammer_task_model_status_dto.config.map(rec => rec.config).filter(
				str => str !== 'confirmed' && str !== 'waiting' && str !== 'cancelled'
			))
		}

		override mock_periodically() { return true }

		override mock(next?: ReturnType<this['defaults']> | null) {
			const status = next?.status === 'waiting'
				? 'waiting' :
					next?.status === 'confirmed' ? 'jamming' :
						next?.status === 'cancelled' ? 'idle' :
							Math.random() > .8 ? 'waiting' :
								this.pick_status()

			let id = this.id()
			if (next && this.is_draft()) {
				return undefined
				// id = id + '-server'
			}

			if (next) return { ...next, id, status }

			const auto = Math.random() > .6
			const comment = $mol_stub_message(100)

			const bands = new this.$.$yuf_sj_jammer_sdr_model_limits().defaults().bands
			const band_index = '1'
			const [freq_min, freq_max] = bands[band_index]

			const freq_range = [
				freq_min + Math.floor(3 + Math.random() * 10),
				freq_max - Math.floor(3 + Math.random() * 100)
			]

			return {
				id,
				status,
				auto,
				freq_range,
				comment,
			} as ReturnType<this['defaults']>
		}
	}
}
