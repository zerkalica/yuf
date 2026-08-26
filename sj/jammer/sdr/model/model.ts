namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const str = $mol_data_string
	const bool = $mol_data_boolean
	const arr = $mol_data_array
	const dict = $mol_data_dict
	const cnst = $mol_data_const
	const vr = $mol_data_variant

	const sdr_limits_dto = rec({
		bands: dict(arr(num)),
		spread_factors: opt(nul(arr(str))),
	})

	const mode_dto = vr(
		cnst('auto' as const),
		cnst('manual' as const),
	)

	export const $yuf_sj_jammer_sdr_model_dto = rec({
		bands: dict(arr(num)),
		mode: mode_dto,
		master: bool,
	})

	export class $yuf_sj_jammer_sdr_model_limits extends $yuf_ws_entity<typeof sdr_limits_dto.Value> {
		override type() { return 'jammer_limits' }
		override defaults(raw?: {}) {
			return sdr_limits_dto({
				bands: {
					'1': [150_000, 1_200_000_000],
					'2': [500_000, 1020_000],
					'3': [2100_000, 2700_000],
				},
				spread_factors: [ 'sf5', 'sf6', 'sf7', 'sf8', 'sf9', 'sf10', 'sf11', 'sf12', 'sf13' ],
				...raw,
			})
		}

		bands(next?: Record<string, readonly [number, number]>) {
			return this.value('bands', next) ?? {}
		}

		spread_factors(next?: readonly string[]) {
			return this.value('spread_factors', next) ?? []
		}

		@ $mol_mem
		band_limit() { return $yuf_sj_ui_range_expanded(this.bands()) }

	}

	export class $yuf_sj_jammer_sdr_model_range extends $yuf_ws_entity<{min: number, max: number}> {
		override defaults(raw?: {}) {
			return {
				min: 0,
				max: 0,
				...raw,
			}
		}

		min(next?: number) { return this.value('min', next) ?? null }
		max(next?: number) { return this.value('max', next) ?? null }
	}

	export class $yuf_sj_jammer_sdr_model extends $yuf_ws_entity<typeof $yuf_sj_jammer_sdr_model_dto.Value> {

		override defaults(raw?: {}) {
			return $yuf_sj_jammer_sdr_model_dto({
				mode: 'auto',
				master: false,
				bands: {},
				...raw,
			})
		}

		override type() { return 'jammer_settings' }


		master(next?: boolean) { return this.value('master', next) ?? false }

		@ $mol_mem
		slaves() {
			return this.$.$yuf_sj_jammer_slave_store.make({
				id: () => this.id(),
				ws: () => this.ws(),
			})
		}

		mode(next?: typeof mode_dto.Value) { return this.value('mode', next) }

		@ $mol_mem
		bands(next?: Record<string, readonly number[]>) {
			return this.value('bands', next) ?? {}
		}

		range_ids() {
			return Object.keys(this.bands())
		}

		@ $mol_mem_key
		protected range_data(id: string, next?: Partial<{ min: number, max: number }> | null) {
			let prev = this.bands()

			if (next || next === null) {
				const draft = this.draft()?.bands
				const draft_val = draft?.[id] ?? prev?.[id]

				const full: Record<string, readonly number[]> = {
					...prev,
					...draft,
				}
				if (next) full[id] = [ next.min ?? draft_val?.[0], next.max ?? draft_val?.[1] ]

				if (next === null) delete full[id]

				prev = this.bands(full)
				if (next === null) return null
			}

			return prev[id] ? { min: prev[id][0], max: prev[id][1] } : null
		}

		@ $mol_mem_key
		range_by_id(id: string) {
			return this.$.$yuf_sj_jammer_sdr_model_range.make({
				data: next => this.range_data(id, next),
			})
		}

		@ $mol_mem
		protected hard_limits() {
			return this.$.$yuf_sj_jammer_sdr_model_limits.make({
				id: () => this.id(),
				ws: () => this.ws(),
			})
		}

		band_limit_hard() { return this.hard_limits().band_limit() }

		spreads_available() {
			return this.hard_limits().spread_factors()
		}

	}
}
