namespace $ {
	export type $yuf_form_attr_group_type = {
		name?: string
		hint?: string
	}

	export type $yuf_form_attr_type = {
		type?: 'string' | 'date' | 'list'
		name?: string
		group?: string
		hint?: string
		mask?: string
		required?: boolean
		enabled?: boolean
		list_min?: number
		list_max?: number
		length_min?: number
		length_max?: number
		trim_disabled?: boolean
	}

	type PartialNullable<T> = {
		[P in keyof T]?: T[P] | null
	}

	export class $yuf_form_attr_group extends $mol_object {
		@ $mol_mem
		data(next?: Partial<$yuf_form_attr_group_type> | null) {
			return {} as PartialNullable<$yuf_form_attr_group_type>
		}

		name() { return this.data().name ?? '' }
		hint() { return this.data().hint ?? '' }
	}

	export class $yuf_form_attr extends $mol_object {
		@ $mol_mem
		data(next?: Partial<$yuf_form_attr_type> | null) {
			return {} as PartialNullable<$yuf_form_attr_type>
		}

		name() { return this.data().name ?? '' }
		hint() { return this.data().hint ?? '' }

		mask() { return this.data().mask ?? '' }
		type() { return this.data().type ?? 'string' }
		required() { return this.data().required ?? false }
		enabled() { return this.data().enabled ?? true }

		group() { return this.data().group ?? '' }
		trim_disabled() { return this.data().trim_disabled ?? null }
		list_min() { return this.data().list_min ?? null }
		list_max() { return this.data().list_max ?? null }
		length_min() { return this.data().length_min ?? null }
		length_max() { return this.data().length_max ?? null }
	}
}
