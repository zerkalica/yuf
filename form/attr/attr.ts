namespace $ {
	export type $yuf_form_attr_type = {
		name: string
		hint?: string
		mask?: string
		required?: boolean
		enabled?: boolean
		type: 'string' | 'date'
		min?: number
		max?: number
	}

	type PartialNullable<T> = {
		[P in keyof T]?: T[P] | null
	}

	export class $yuf_form_attr extends $mol_object {
		@ $mol_mem
		data() {
			return {} as PartialNullable<$yuf_form_attr_type>
		}

		name() { return this.data().name ?? '' }
		hint() { return this.data().hint ?? '' }
		mask() { return this.data().mask ?? '' }
		type() { return this.data().type ?? 'string' }
		required() { return this.data().required ?? false }
		enabled() { return this.data().enabled ?? true }
		min() { return this.data().min ?? null }
		max() { return this.data().max ?? null }
	}
}
