namespace $.$$ {
	export class $yuf_form_bid extends $.$yuf_form_bid {

		value_str(field: string) {
			const val = this.value(field)
			if (typeof val !== 'string') throw new Error('Not a string', { cause: { field }})
			return val
		}

		value_bool(field: string) {
			const val = this.value(field)
			if (typeof val !== 'boolean') throw new Error('Not a boolean', { cause: { field }})
			return val
		}

		value_number(field: string) {
			const val = this.value(field)
			if (typeof val !== 'number') throw new Error('Not a number', { cause: { field }})
			return val
		}

		list_string(field: string) {
			const val = this.value(field)
			if (Array.isArray(val)) throw new Error('Not an array', { cause: { field }})
			return val as readonly string[]
		}

		dictionary_bool(field: string) {
			const val = this.value(field)
			if (Array.isArray(val) || ! val || typeof val !== 'object') throw new Error('Not an object', { cause: { field }})
			return val
		}

		format(key: string, template: string) {
			const name = this.field_name(key)
			const message = template.replace(
				/{([\d\w_]+)}/g,
				(_, val) => (this as any as Record<string, null | ((k: string) => string)>)[val]?.(key) || '0'
			)
			if (! name) return message

			return this.field_name_msg().replace('{field_name}', name).replace('{message}', message.toLocaleLowerCase())
		}

		override url(key: string) {
			const url = this.value_str(key)
			return $mol_error_fence(() => (new URL(url), ''), () => this.format(key, this.url_msg()))
		}

		@ $mol_mem_key
		override value_date(field: string) {
			const value = this.value(field)
			if (value instanceof this.$.$mol_time_moment || typeof value === 'string') return value
			throw new Error('Not a date', { cause: { value } })
		}

		protected min_msg_formatted(field: string) {
			if (typeof this.value(field) === 'string') return this.str_min_msg()
			return this.min_msg()
		}

		protected max_msg_formatted(field: string) {
			if (typeof this.value(field) === 'string') return this.str_max_msg()
			return this.max_msg()
		}

		override value_empty(field: string) {
			const val = this.value(field)
			if (typeof val === 'string' || Array.isArray(val)) return val.length === 0
			if (typeof val === 'number') return Number.isNaN(val)
			return val === null || val === undefined
		}

		@ $mol_mem_key
		override min( field: string ) {
			if (this.value_empty(field)) return ''
			const val = this.value(field)
			const limit = this.min_val(field)

			if (val instanceof $mol_time_moment) return ! limit || val.toString() >= limit.toString() ? '' : this.format(field, this.date_min_msg() )
			if (typeof val === 'number') return limit === null || limit === undefined || val >= limit ? '' : this.format(field, this.min_msg() )
			if (Array.isArray(val)) return ! limit || val.length >= limit ? '' : this.format(field, this.list_min_msg() )

			return ! limit || val.length >= limit ? '' : this.format(field, this.str_min_msg() )
		}

		@ $mol_mem_key
		override max( field: string ) {
			if (this.value_empty(field)) return ''
			const val = this.value(field)
			const limit = this.max_val(field)

			if (val instanceof $mol_time_moment) return ! limit || val.toString() <= limit.toString() ? '' : this.format(field, this.date_max_msg() )
			if (typeof val === 'number') return limit === null || limit === undefined || val <= limit ? '' : this.format(field, this.max_msg() )
			if (Array.isArray(val)) return ! limit || val.length <= limit ? '' : this.format(field, this.list_max_msg() )

			return ! limit || val.length <= limit ? '' : this.format(field, this.str_max_msg() )
		}

		@ $mol_mem_key
		override required( field: string ) {
			const val = this.value(field)
			if (typeof val === 'boolean') return ''
			if (typeof val === 'number' && ! Number.isNaN(val) ) return ''
			if (typeof val === 'string' && val) return ''
			if (Array.isArray(val) && val.length) return ''
			if (! Array.isArray(val) && val && typeof val === 'object' && Object.keys(val).length) return ''

			return this.format(field, this.required_msg())
		}

		override min_val(field: string) {
			return this.params_min()[field] ?? null
		}

		override max_val(field: string) {
			return this.params_max()[field] ?? null
		}

		override rows_max_val(field: string) {
			return this.params_max_rows()[field] ?? null
		}

		override pattern_val(field: string) {
			return this.params_pattern()[field] ?? super.pattern_val(field)
		}

		@ $mol_mem_key
		override min_date_val(field: string) {
			const val = this.params_min_date()[field]
			return typeof val === 'string' ? new $mol_time_moment(val) : val
		}

		@ $mol_mem_key
		override max_date_val(field: string) {
			const val = this.params_max_date()[field]
			return typeof val === 'string' ? new $mol_time_moment(val) : val
		}

		override pattern(field: string) {
			if (this.value_empty(field)) return ''

			const pattern = this.pattern_val(field)
			const regex = new RegExp(`^(?:${pattern})$`)
			const str = this.value_str(field)
			if ( str.match(regex) ) return ''

			return this.format(field, this.pattern_not_match_msg())
		}

		override rows_max( field: string ) {
			if (this.value_empty(field)) return ''

			const val = this.value_str( field )
			const rows = val.split('\n').length
			const max = this.rows_max_val(field)
			if (max === null || rows <= max) return ''

			return this.format(field, this.rows_max_msg())
		}

		override json_invalid( field: string) {
			if (this.value_empty(field)) return ''
			const val = this.value_str( field )

			try {
				if (val) JSON.parse(val)
				return ''
			} catch (e) {
				return this.json_invalid_msg().replace('{error}', (e as Error).message)
			}
		}

		override ip4(field: string, flag?: 'mask-allowed' | 'mask-required') {
			if (this.value_empty(field)) return ''
			const val = this.value_str(field)

			const match = val.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d{1,4}))?(?:\/(\d{1,2}))?$/)

			if (match) {
				const [_, ip_str, port, mask] = match
				const parts = ip_str.split('.').map(Number)
				const msk = Number(mask || 0)

				if (
					parts.every(num => num <= 255)
					&& Number(port || 0) < 65535
					&& (flag ? (msk >= (flag === 'mask-allowed' ? 0 : 1) && msk <= 32 ) : msk === 0)
				) return ''
			}

			return flag === 'mask-required' ? this.ip4_mask_msg() : this.ip4_msg()
		}

		override ip4_mask(field: string) {
			return this.ip4(field, 'mask-allowed')
		}

		override ip4_mask_required(field: string) {
			return this.ip4(field, 'mask-required')
		}

		override latin_digits(field: string) {
			if (this.value_empty(field)) return ''
			const val = this.value_str(field)
			if (val.match(/^[\w\d]+$/)) return ''

			return this.format(field, this.latin_digits_msg())
		}

		override latin_digits_alpha(field: string) {
			if (this.value_empty(field)) return ''
			const val = this.value_str(field)

			if ( val.match(/^[\w\d\-\.\;\!]+$/)) return ''

			return this.format(field, this.latin_digits_msg())
		}

		override value_limits(field: string) {
			return this.params_limits()[field] ?? super.value_limits(field)
		}

		override value_in_range(field: string) {
			if (this.value_empty(field)) return ''

			const val = this.value_number(field)

			const ranges = this.value_limits(field)

			let range

			for (const [min, max] of ranges) {
				range = [ min, max ]
				if (val >= min && val <= max) return ''
			}

			return this.value_in_range_msg().replace('{range}', range?.join(' - ') ?? '-')
		}
	}
}
