namespace $.$$ {
	export class $yuf_number_range extends $.$yuf_number_range {
		
		override limit() { return new $mol_vector_range(this.min(), this.max()) }

		override value(key: string, next?: number) {
			return key === 'min' ? this.value_min(next) : this.value_max(next)
		}

		override required_num(key: string) {
			const value = this.value(key)
			if (Number.isNaN(value) && this.required(key)) return this.required_msg()
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
