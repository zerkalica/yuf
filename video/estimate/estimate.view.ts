namespace $.$$ {
	export class $yuf_video_estimate extends $.$yuf_video_estimate {

		override time_formatted() {
			const duration_ms = this.duration() * 1000
			const time_ms = this.time() * 1000

			const duration = Number.isNaN(duration_ms) || duration_ms === Infinity
				? null
				: new $mol_time_duration(duration_ms).normal

			const time = Number.isNaN(time_ms) ? null : new $mol_time_duration(time_ms).normal

			const ms_enabled = this.ms_enabled()
			const sec_fmt = `ss${ms_enabled ? '.sss' : ''}`

			const template = `${duration?.hour ? 'hh:' : ''}mm:${sec_fmt}`

			let duration_str = duration?.toString(template) ?? '-'
			let time_str = time?.toString(template) ?? '-'
			if (ms_enabled && duration_str.length > 3) {
				duration_str = duration_str.slice(0, -1)
			}
			if (ms_enabled && time_str.length > 3) {
				time_str = time_str.slice(0, -1)
			}

			return `${time_str} / ${duration_str}`
		}		
	}
}
