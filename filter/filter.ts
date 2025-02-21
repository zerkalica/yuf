namespace $ {
	export class $yuf_filter<Item = string> extends $mol_object {
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
			if (val === false) return ''
			return `${name}${this.value_separator()}${val}`
		}

		protected deserialize(str: string, def: unknown) {
			if (str === '') return def
			if (typeof def === 'boolean') return Boolean(str) && str !== '0'
			if (typeof def === 'number') return Number.isNaN(Number(str)) ? def : Number(str)

			return str ?? def
		}

		@ $mol_mem
		data(next?: ReturnType<typeof this['defaults']> | null) {
			type SO = Record<string, string | number | boolean | null>

			const defaults = this.defaults() as SO
			const sep = this.separator()
			const keys = Object.keys(defaults)

			const str = next
				? keys.map(name => this.serialize((next as SO)[name], defaults[name], name)).filter(Boolean).join(sep)
				: next === null ? null : undefined

			const serialized = this.data_str(str === '' ? null : str)

			const chunks = serialized?.split(sep) ?? []

			const result = { ...defaults } as ReturnType<typeof this['defaults']>

			for (const chunk of chunks) {
				const [name, str] = chunk.split(this.value_separator()) ?? []
				if (defaults[name] === undefined) continue
				const val = this.deserialize(str ?? name, defaults[name])
				;(result as SO)[name] = val as any
			}

			return result
		}

		@ $mol_mem_key
		value<
			Field extends keyof NonNullable<ReturnType< this['data'] >>
		>(
			field: Field,
			value?: NonNullable<ReturnType< this['data'] >>[ Field ] | null,
		) {
			let data = this.data()
			if (value !== undefined) data = this.data({...data, [field]: value })

			return data[field as never] as NonNullable<ReturnType< this['data'] >>[ Field ]
		}

		@ $mol_mem
		count(next?: number | null): number {
			throw new Error('implement')
		}

		@ $mol_mem_key
		chunk(offset: number): undefined | readonly Item[] {
			throw new Error('implement')
		}

		chunk_size() {
			return 100
		}

		@ $mol_mem_key
		page(page: number) {
			$mol_wire_solid()
			return this.chunk(page * this.chunk_size())
		}

		at(offset: number) {
			const limit = this.chunk_size()

			const chunk_index = offset % limit
			const page = Math.floor(offset / limit)

			const chunk = this.page(page)
			const id = chunk?.[chunk_index]

			if (id === undefined) throw new Error('Empty id')

			return id
		}

		reset() {
			this.count(null)
		}

		@ $mol_mem
		rows() {
			return this.$.$mol_range2(index => this.at(index), () => this.count())
		}
	}
}
