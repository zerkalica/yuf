namespace $.$$ {
	export class $yuf_sj_ui_range_group extends $.$yuf_sj_ui_range_group {
		
		required_num(key: string) {
			const value = this.value(key)
			if (Number.isNaN(value)) return super.required_num(key)
			return ''
		}

		override limit_msg(key: string) {
			const value = this.value(key)
			if (Number.isNaN(value)) return ''

			const limit = this.limit()
			const { min, max } = limit

			if (! Number.isNaN(min) && value < min) {
				return `> ${min}`
			}

			if (! Number.isNaN(max) && value > max) {
				return `< ${max}`
			}

			return ''
		}

		override greater_min(key: string) {
			const value = this.value(key)
			if (Number.isNaN(value)) return ''
			const min = this.value('min')
			if (Number.isNaN(min)) return ''
			if (this.limit_msg('min')) return ''
			if (value > min) return ''

			return super.greater_min(key).replace('{min}', min.toFixed())
		}

		
	}
}
