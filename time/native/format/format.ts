namespace $ {
	export function $yuf_time_native_format(lang: string | undefined, template: string, native: Date) {
		return template.replace(/(date_time|date|time)(?:_(tiny|short|medium|long|full))?/g, (
			_,
			kind: 'date_time' | 'date' | 'time',
			type: 'tiny' | 'short' | 'medium' | 'long' | 'full' | undefined
		) => {
			const style = type === 'tiny' ? 'short' : type ? type : undefined
			let str = ''

			if (kind === 'date') str = native.toLocaleDateString(lang, { dateStyle: style })
			if (kind === 'time') str = native.toLocaleTimeString(lang, { timeStyle: style })
			if (kind === 'date_time') str = native.toLocaleString(lang, { timeStyle: style, dateStyle: style })

			if (type !== 'tiny') return str

			if (kind === 'date' || kind === 'date_time') str = str.replace(/\d{2}(\d{2})/, '$1') // YYYY -> YY
			if (kind === 'time' || kind === 'date_time') str = str.replace(/(\d{2}:\d{2}):\d{2}/, '$1') // hh:mm:ss -> hh:mm

			return str
		})
	}
}
