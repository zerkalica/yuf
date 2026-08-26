namespace $ {
	export class $yuf_sj_ui_band extends $mol_object {
		@ $mol_mem
		range() {
			const limit = new $mol_vector_range(Infinity, -Infinity)
			for (const [min, max] of Object.values(this.dict())) {
				limit.min = Math.min(min, limit.min)
				limit.max = Math.max(max, limit.max)
			}
			return limit
		}

		@ $mol_mem_key
		in_any_range(value: number) {
			let good = false
			for (const [min, max] of Object.values(this.dict())) {
				if (value >= min && value <= max) good = true
			}

			return good
		}

		limits(enabled: Record<string, boolean>) {
			return Object.entries(this.dict())
				.map(([ key, range ]) => enabled[key] ? range as readonly number[]: null)
				.filter($mol_guard_defined)
		}

		options() {
			return [] as readonly (readonly number[])[]
		}

		@ $mol_mem
		dict() {
			const result = {} as Record<string, readonly number[]>
			const items = this.options()
			for (let i = 0; i < items.length; i++) {
				result[String(i || '0')] = items[i]
			}

			return result
		}

		@ $mol_mem
		available() {
			const result = {} as Record<string, string>
			const bands = this.dict()

			for (const key of Object.keys(bands)) {
				result[key] = bands[key].join(' - ')
			}

			return result
		}
	}
}

