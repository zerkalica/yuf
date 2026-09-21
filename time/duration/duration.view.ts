namespace $.$$ {

	function decl_ru(number: number, titles: readonly string[]) {
		const cases = [2, 0, 1, 1, 1, 2]
		number = Math.abs(number)
		return titles[
			(number % 100 > 4 && number % 100 < 20)
				? 2
				: cases[ (number % 10 < 5) ? number % 10 : 5 ]
		]
	}

	function decl_common(number: number, titles: readonly string[]) {
		return number === 1 ? titles[0] : titles[1]
	}

	function decl_ar(number: number, titles: readonly string[]) {
		return number === 1 ? titles[0] : number === 2 ? titles[1] : titles[2]
	}

	const rules = {
		ru: decl_ru,
		ar: decl_ar
	}

	export class $yuf_time_duration extends $.$yuf_time_duration {
		override normalized() {
			return this.value().normal
		}

		part(key: string, index: number) {
			const data = this.normalized()
			type time_parts = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
			let value = key in data ? Math.round(data[key as time_parts]) : null
			const lang = this.$.$mol_locale.lang()
			const text = value
				? (rules[lang as keyof typeof rules] || decl_common)( value, this[key as time_parts]().split('|') )
				: ''

			const normalized = ! value ? null : this.show_minus() ? value : Math.abs(value)

			return normalized
				? `${normalized === 1 ? '' : `${normalized} `}${text}`
				: (value === null ? key : null)
		}

		override formatted() {
			return this.template().map((key, i) => this.part(key, i)).filter(Boolean).join(' ')
		}

	}
}
