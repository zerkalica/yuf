namespace $.$$ {
	export class $yuf_form_bid extends $.$yuf_form_bid {

		value_str(field: string) {
			const val = this.value(field)
			if (typeof val !== 'string') throw new Error('Not a string: ' + field)
			return val
		}

		value_bool(field: string) {
			const val = this.value(field)
			if (typeof val !== 'boolean') throw new Error('Not a boolean: ' + field)
			return val
		}

		value_number(field: string) {
			const val = this.value(field)
			if (typeof val !== 'number') throw new Error('Not a number: ' + field)
			return val
		}

		list_string(field: string) {
			const val = this.value(field)
			if (Array.isArray(val)) throw new Error('Not an array: ' + field)
			return val as readonly string[]
		}

		dictionary_bool(field: string) {
			const val = this.value(field)
			if (Array.isArray(val) || ! val || typeof val !== 'object') throw new Error('Not an object: ' + field)
			return val
		}

		format(key: string, str: string) {
			return str.replace(
				/{([\d\w_]+)}/g,
				(_, val) => (this as any as Record<string, null | ((k: string) => string)>)[val]?.(key) || ''
			)
		}

		@ $mol_mem_key
		override list_min( field: string ) {
			const len = this.list_string( field )?.length ?? 0

			if ( len >= this.list_min_val(field)) return ''

			return this.format(field, this.list_min_msg())
		}

		@ $mol_mem_key
		override list_max( field: string ) {
			const len = this.list_string( field )?.length ?? 0

			if ( len <= this.list_max_val(field)) return ''

			return this.format(field, this.list_max_msg())
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
		
		@ $mol_mem_key
		override str_min( field: string ) {
			const len = this.value_str( field ).length
			if (! len) return '' // required check
			if ( len >= this.str_min_val(field) ) return ''

			return this.format(field, this.str_min_msg())
		}
		
		@ $mol_mem_key
		override str_max( field: string ) {
			const len = this.value_str( field ).length
			if (len <= this.str_max_val(field)) return ''

			return this.format(field, this.str_max_msg())
		}

		@ $mol_mem_key
		override rows_max( field: string ) {
			const val = this.value_str( field )
			const rows = val.split('\n').length
			if (! val) return ''
			if (rows <= this.rows_max_val(field)) return ''

			return this.format(field, this.rows_max_msg())
		}

		override json_invalid( field: string) {
			const val = this.value_str( field )
			try {
				if (val) JSON.parse(val)
				return ''
			} catch (e) {
				return this.json_invalid_msg().replace('{error}', (e as Error).message)
			}
		}

		override ip4(field: string, flag?: 'mask-allowed' | 'mask-required') {
			const val = this.value(field) as string
			if (! val) return ''

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

			return super.ip4(field)
		}

		override ip4_mask(field: string) {
			return this.ip4(field, 'mask-allowed')
		}

		override ip4_mask_required(field: string) {
			return this.ip4(field, 'mask-required')
		}

		override latin_digits(field: string) {
			const val = this.value_str(field)
			if (! val) return ''
			if (val.match(/^[\w\d]+$/)) return ''

			return this.format(field, this.latin_digits_msg())
		}

		override value_in_range(key: string) {
			const val = this.value_number(key)
			const ranges = this.value_limits(key)

			let range

			for (const [min, max] of ranges) {
				range = [ min, max ]
				if (val >= min && val <= max) return ''
			}

			return super.value_in_range(key).replace('{range}', range?.join(' - ') ?? '-')
		}
	}
}
