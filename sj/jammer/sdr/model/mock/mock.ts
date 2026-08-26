namespace $ {
	export class $yuf_sj_jammer_sdr_model_mock_limits extends $yuf_sj_jammer_sdr_model_limits {
		override mock(next?: ReturnType<this['defaults']> | null): ReturnType<this['defaults']> | null {
			return next ?? this.defaults() as ReturnType<this['defaults']>
		}
	}

	export class $yuf_sj_jammer_sdr_model_mock extends $yuf_sj_jammer_sdr_model {

		override mock(next?: ReturnType<this['defaults']> | null): ReturnType<this['defaults']> | null {

			if (next) return next

			const bands = this.hard_limits().defaults().bands
			const data: typeof $yuf_sj_jammer_sdr_model_dto.Value = {
				bands: { '1': bands[1], '2': bands[2] },
				mode: 'auto',
				master: false,
			}

			return data as ReturnType<this[ 'defaults' ]>
		}

	}
}
