namespace $ {
	export class $yuf_sj_jammer_rule_model_mock extends $yuf_sj_jammer_rule_model {
		pick_freqs() {
			const freqs = [] as number[]
			const freqs_max = 3 + Math.floor(Math.random() * 130)
			for (let i = 0; i < freqs_max; i++) {
				freqs.push(Math.floor(100 * Math.random() + 5))
			}

			return freqs
		}


		override mock(next?: ReturnType<this['defaults']> | null) {
			if (next) {
				return { ... next }
			}

			const id = this.id()
			let index = Number(id.slice(1) || 0)
			if (Number.isNaN(index)) index = 0
			const access = id.at(0) === 'a' ? 'allow' : 'deny'
			const bind_uuid = null

			const diff = 1500
			let time = new Date().getTime() - index * diff

			const comment = Math.random() > .5 ? $mol_stub_message(100).trim() : ''

			const freqs = bind_uuid ? [] : this.pick_freqs()

			const limits = new this.$.$yuf_sj_jammer_sdr_model_limits().defaults()
			const bands = limits.bands
			const band_index = '1'
			const [freq_min, freq_max] = bands[band_index]

			const freq_range = [
				freq_min + Math.floor(3 + Math.random() * 10),
				freq_max - Math.floor(3 + Math.random() * 100)
			]

			return $yuf_sj_jammer_rule_model_dto({
				id,
				bind_uuid,
				freq_range,
				freqs,
				comment,
				access,
				time: new Date(time).toISOString()
			}) as ReturnType<this['defaults']>

		}
	}
}
