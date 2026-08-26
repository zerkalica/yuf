namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const bool = $mol_data_boolean
	const opt = $mol_data_optional
	const arr = $mol_data_array
	const nul = $mol_data_nullable
	const vr = $mol_data_variant
	const cnst = $mol_data_const

	export const $yuf_sj_jammer_task_model_status_dto = vr(
		cnst('idle' as const),
		cnst('scanning' as const),
		cnst('receiving' as const),
		cnst('jamming' as const),
		cnst('waiting' as const),
		cnst('confirmed' as const),
		cnst('cancelled' as const),
	)

	export const $yuf_sj_jammer_task_model_dto = rec({
		id: str,
		status: opt(nul($yuf_sj_jammer_task_model_status_dto)),
		freq_range: arr(num),
		comment: opt(nul(str)),
		auto: opt(nul(bool)),
	})

	export class $yuf_sj_jammer_task_model extends $yuf_ws_entity<typeof $yuf_sj_jammer_task_model_dto.Value> {
		override type() { return 'task' }
		override defaults(raw?: {}) {
			return $yuf_sj_jammer_task_model_dto({
				id: this.id() || '1',
				status: null,
				freq_range: [],
				comment: '',
				auto: false,
				...raw
			})
		}

		sdr() {
			return this.$.$yuf_sj_jammer_sdr_model.make({})
		}

		status(next?: typeof $yuf_sj_jammer_task_model_status_dto.Value) {
			return this.value('status', next) ?? null
		}

		freq_range(next?: readonly number[]) {
			return this.value('freq_range', next) ?? []
		}

		freq_min(next?: number): number | null {
			const draft = next === undefined ? next : this.draft()?.freq_range
			const [, max = 0 ] = draft ?? this.freq_range()

			return this.freq_range(next === undefined ? next : [ next, max ])?.[0] ?? null
		}

		freq_max(next?: number): number | null {
			const draft = next === undefined ? next : this.draft()?.freq_range
			const [min = 0, ] = draft ?? this.freq_range()

			return this.freq_range(next === undefined ? next : [ min, next ])?.[1] ?? null
		}

		comment(next?: string) { return this.value('comment', next) ?? '' }
		auto(next?: boolean) { return this.value('auto', next) ?? false }

		master() { return this.sdr().master() }

		title() {
			const [min, max] = this.freq_range()
			return `#${this.id()} ${min ?? '?'} - ${max ?? '?'} kHz`
		}
	}
}
