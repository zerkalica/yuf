namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const vr = $mol_data_variant
	const cnst = $mol_data_const
	const arr = $mol_data_array
	const enm = $mol_data_enum

	export const $yuf_sj_jammer_rule_model_status_dto = enm('yuf_sj_jammer_rule_model_status_dto', {
		deny: 'deny',
		allow: 'allow',
	} as const)

	export const $yuf_sj_jammer_rule_model_dto = rec({
		id: str,
		freqs: opt(nul(arr(num))),
		bind_uuid: opt(nul(str)),
		freq_range: arr(num),
		spread_factors: opt(nul(arr(str))),
		comment: opt(str),
		time: str, // ISO 8601,
		access: $yuf_sj_jammer_rule_model_status_dto
	})

	export class $yuf_sj_jammer_rule_model extends $yuf_ws_entity<typeof $yuf_sj_jammer_rule_model_dto.Value> {
		override type() { return 'rule' }

		override defaults(raw?: {}) {
			return $yuf_sj_jammer_rule_model_dto({
				id: this.id() || '1',
				freqs: null,
				freq_range: [],
				spread_factors: [],
				bind_uuid: null,
				access: $yuf_sj_jammer_rule_model_status_dto.config.dict.allow,
				time: new $mol_time_moment().toString('YYYY-MM-DDThh:mm:ssZ'),
				comment: '',
				...raw,
			})
		}

		sdr() {
			return this.$.$yuf_sj_jammer_sdr_model.make({})
		}

		@ $mol_mem
		title() {
			return [
				this.created_at().toString('DD.MM.YY hh:mm:ss.sss'),
				this.comment()
			].filter(Boolean).join(' | ')
		}

		bind_uuid_required() { return this.bind_uuid() !== null }

		bind_uuid(next?: string | null) { return this.value('bind_uuid', next) ?? null }
		access(next?: ReturnType<typeof this.defaults>['access']) { return this.value('access', next) ?? 'deny' }
		comment(next?: string) { return this.value('comment', next) ?? '' }
		time_raw(next?: string) { return this.value('time', next) || '' }

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

		spreads(next?: readonly string[]) { return this.value('spread_factors', next) ?? [] }

		freqs(next?: readonly number[]) { return this.value('freqs', next) ?? [] }

		freqs_str(next?: string) {
			let arr = [] as number[]

			const freqs = this.freqs(next?.split(',').map(val => Number(val.trim().replace(/_/g, ''))))
			if (freqs.length) arr = [ ...freqs ]

			return arr.join(', ')
		}

		@ $mol_mem
		created_at(next?: $mol_time_moment) {
			const str = this.time_raw(next?.toString())
			return new $mol_time_moment(str)
		}

	}
}
