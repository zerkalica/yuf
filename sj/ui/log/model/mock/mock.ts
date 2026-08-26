namespace $ {
	const levels = $yuf_sj_ui_log_model_level_dto.config.map(key => key.config)
	
	function $yuf_sj_ui_log_model_mock_line({
		max_line_length = 200, time = Date.now(), max_level = 'trace'
	}: {
		max_level?: (typeof levels)[number]
		max_line_length?: number
		time?: number
	}) {
		const level = $mol_array_lottery(levels.slice(0, levels.indexOf(max_level) + 1))
		const date = new Date(time)
		const time_str = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
		const message = $mol_stub_message(100 + Math.ceil(max_line_length * Math.random()))

		return `[${time_str}] [${level}] ${message}`
	}

	function $yuf_sj_ui_log_model_mock_lines_create({
		max_lines = 1000,
		max_line_length = 200,
		time_delta = 500,
		max_level = 'trace',
		time = Date.now()
	}: {
		time?: number,
		max_lines?: number
		max_level?: (typeof levels)[number]
		max_line_length?: number
		time_delta?: number
	}) {
		const result = [] as string[]

		time = time - max_lines * time_delta

		for (let i = 0; i < max_lines; i++) {
			result.push($yuf_sj_ui_log_model_mock_line({ max_line_length, time, max_level }))
			time += time_delta
		}

		return result
	}

	export class $yuf_sj_ui_log_model_mock extends $yuf_sj_ui_log_model {
		@ $mol_mem
		override mock(next?: ReturnType<this['defaults']> | null) {
			return next ?? this.defaults() as ReturnType<this[ 'defaults' ]>
		}
	}

	export class $yuf_sj_ui_log_model_mock_lines extends $yuf_sj_ui_log_model_lines {
		override mock_periodically() {
			return true
		}

		line_parameters() {
			return {
				max_lines: this.limit(),
				max_line_length: 500,
				max_level: this.level() || 'error',
			}
		}

		override mock(next?: ReturnType<this['defaults']> | null) {
			const params = this.line_parameters()

			const max_lines = ! next ? 30 : 1

			return $yuf_sj_ui_log_model_mock_lines_create({ ...params, max_lines }) as ReturnType<this['defaults']>
		}
	}
}
