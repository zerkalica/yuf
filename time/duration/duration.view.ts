namespace $.$$ {

	function declOfNum(number: number, titles: readonly string[]) {
		const cases = [2, 0, 1, 1, 1, 2]

		return titles[
			(number % 100 > 4 && number % 100 < 20)
				? 2
				: cases[ (number % 10 < 5) ? number % 10 : 5 ]
		]
	}

	export class $yuf_time_duration extends $.$yuf_time_duration {

		@ $mol_mem
		normal() {
			return this.value().normal
		}

		part(key: string) {
			const data = this.normal()
			type time_parts = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
			const value = key in data ? Math.round(data[key as time_parts]) : null
			const text = value ? declOfNum(value, this[key as time_parts]().split('|')) : ''

			return value
				? `${value} ${text}`
				: (value === null ? key : null)
		}

		override formatted() {
			return this.template().map(key => this.part(key)).filter(Boolean).join(' ')
		}

	}
}
