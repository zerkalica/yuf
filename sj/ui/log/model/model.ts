namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const vr = $mol_data_variant
	const cnst = $mol_data_const
	const arr = $mol_data_array
	const bool = $mol_data_boolean

	export const $yuf_sj_ui_log_model_level_dto = vr(
		cnst('error' as const),
		cnst('warn' as const),
		cnst('info' as const),
		cnst('debug' as const),
		cnst('trace' as const),
	)

	const log_settings_dto = rec({
		level: nul($yuf_sj_ui_log_model_level_dto),
	})

	const log_lines_dto = arr(str)

	export class $yuf_sj_ui_log_model_lines extends $yuf_ws_entity<typeof log_lines_dto.Value> {
		override type() { return 'log_rows' }
		override defaults( raw?: typeof log_lines_dto.Value ) { return log_lines_dto(raw ?? []) }

		limit() { return 0 }

		level() {
			return 'trace' as typeof $yuf_sj_ui_log_model_level_dto.Value | null | ''
		}

		override query(): Record<string, string> {
			return {
				max: String(this.limit()),
			}
		}
	}

	export class $yuf_sj_ui_log_model extends $yuf_ws_entity<typeof log_settings_dto.Value> {

		override type() { return 'log_settings' }
		override defaults(raw?: {}) {
			return log_settings_dto({
				level: null,
				...raw
			})
		}

		override device() {
			return this.id() ? [ this.id() ] : []
		}

		level(next?: typeof $yuf_sj_ui_log_model_level_dto.Value | null | '') {
			return this.value('level', next === '' ? null : next) ?? ''
		}

		@ $mol_mem
		levels_available() {
			const record = { '': 'off' } as Record<string, string>

			for (const item of $yuf_sj_ui_log_model_level_dto.config) {
				record[item.config] = item.config
			}

			return record
		}

		lines_collected_max() {
			return 300_000
		}

		@ $mol_mem
		lines_max(next?: number) {
			return next === undefined
				? 10_000
				: Math.min( 1_000_000, Math.max(1000, next) )
		}

		@ $mol_mem
		ws_logs_enabled(next?: boolean) {
			return next ?? ( this.log_enabled() && ! this.server_logs_available() )
		}

		server_logs_available() {
			return true
		}

		@ $mol_mem
		log_enabled() {
			return Boolean(this.level())
		}

		@ $mol_mem
		protected lines_sub() {
			return this.$.$yuf_sj_ui_log_model_lines.make({
				ws: () => this.ws(),
				limit: () => this.lines_max(),
				level: () => this.level(),
			})
		}

		@ $mol_mem
		lines(reset?: null): readonly string[] {
			if (reset === null) return []
			if (! this.log_enabled()) return []
			const sub = this.server_logs_available() ? this.lines_sub() : null
			const server_logs = sub?.data() ?? []

			const ws_logs = ! this.ws_logs_enabled()
				? []
				: this.ws().messages_grab().map(message => JSON.stringify(message, null, ' '))

			let prev = $mol_wire_probe(() => this.lines()) ?? []

			// to prevent memory leak, cut too much lines
			if (prev.length > this.lines_collected_max()) prev = prev.slice(0, 100)

			return [ ...prev, ...server_logs, ... ws_logs ]
		}

		@ $mol_mem
		search_text(next?: string) { return next ?? '' }

		protected search_text_debounce = null as null | $mol_after_timeout

		@ $mol_mem
		search_text_normalized(reset?: null): readonly string[] {
			const next = this.search_text().toLowerCase().split(' ')
			const prev = $mol_wire_probe(() => this.search_text_normalized())

			if (reset === null) return next
			if (! prev) return next

			this.search_text_debounce?.destructor()
			this.search_text_debounce = new $mol_after_timeout(300, () => this.search_text_normalized(null))

			return prev
		}

		visible_max() { return this.lines_max() }

		@ $mol_mem
		indices() {
			const limit = this.visible_max()
			const needles = this.search_text_normalized()
			const all = this.lines()

			const indices = [] as number[]

			const before_index = all.length - 1

			for (let index = before_index; index >= 0 ; index--) {
				const line = all[index].toLowerCase()
				if ( ! needles.length || needles.every(needle => line.includes(needle)) ) {
					indices.push(index)
				}
				if (indices.length >= limit) break
			}

			return indices
		}

		line(index: number) { return this.lines()[index] }
	}
}
