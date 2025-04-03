namespace $ {
	export class $yuf_filter extends $mol_object {
		prefix() { return '' }
		separator() { return '~' }
		value_separator() { return '.' }

		@ $mol_mem
		data_str(str?: string | null) {
			return this.$.$mol_state_arg.value(this.prefix(), str === '' ? null : str) || null
		}

		defaults() { return {} as Record<string, string | number | boolean | null> }

		protected serialize<Val>(val: Val, def: Val, name: string) {
			if (val === def) return ''
			if (val === true) return name
			if (val === false) return `!${name}`
			return `${name}${this.value_separator()}${val}`
		}

		protected deserialize(str: string, def: unknown) {
			if (str === '') return def
			if (typeof def === 'boolean') return str !== '0'
			if (typeof def === 'number') return Number.isNaN(Number(str)) ? def : Number(str)

			return str ?? def
		}

		@ $mol_mem
		data(next?: ReturnType<this['defaults']> | null) {
			type SO = Record<string, string | number | boolean | null>

			const defaults = this.defaults() as SO
			const sep = this.separator()
			const keys = Object.keys(defaults)

			const str = next
				? keys.map(name => this.serialize((next as SO)[name], defaults[name], name)).filter(Boolean).join(sep)
				: next === null ? null : undefined

			const serialized = this.data_str(str === '' ? null : str)

			const chunks = serialized?.split(sep) ?? []

			const result: ReturnType<typeof this.defaults> = { ...defaults }

			for (const chunk of chunks) {
				const [name_raw, str] = chunk.split(this.value_separator()) ?? []
				const neg = name_raw.startsWith('!')
				const name = neg ? name_raw.slice(1) : name_raw

				if (defaults[name] === undefined) continue

				const val = this.deserialize(neg ? '0' : (str ?? '1'), defaults[name])
				;(result as SO)[name] = val as any
			}

			return result as ReturnType<typeof this['defaults']>
		}

		@ $mol_mem_key
		value<
			Field extends keyof NonNullable<ReturnType< this['defaults'] >>
		>(
			field: Field,
			value?: NonNullable<ReturnType< this['defaults'] >>[ Field ] | null,
		) {
			let data = this.data()
			if (value !== undefined) data = this.data({...data, [field]: value })

			return data[field as never] as NonNullable<ReturnType< this['defaults'] >>[ Field ]
		}

	}
}
