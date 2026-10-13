namespace $ {
	export type $yuf_form_attr_group_type = {
		id?: string
		name?: string
		hint?: string
	}

	export type $yuf_form_attr_type = {
		id?: string
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
		@ $mol_mem_key
		protected value<Field extends keyof $yuf_form_attr_type>(field: Field, next?: $yuf_form_attr_type[ Field ] | null) {
			return this.data(next === undefined ? undefined : { [field]: next })?.[ field ] ?? null
		}

		id_actual = null as null | string
		id(next?: string) {
			if(next) this.id_actual = next
			return this.value('id', next) ?? ''
		}

		name(next?: string) { return this.value('name', next) ?? '' }
		hint(next?: string) { return this.value('hint', next) ?? '' }
		mask(next?: string) { return this.value('mask', next) ?? '' }
		required(next?: boolean) { return this.value('required', next) ?? false }

		can_write(id: string) { return this.id() !== 'username' }

		can_remove() {
			const id = this.id()
			return id !== 'username' && id !== 'email'
		}

		type(next?: $yuf_form_attr_type['type']) { return this.value('type', next) ?? 'string' }
		enabled(next?: boolean) { return this.value('enabled', next) ?? true }

		group(next?: string) { return this.value('group', next) ?? '' }
		trim_disabled(next?: boolean | null) { return this.value('trim_disabled', next) ?? null }
		list_min(next?: number | null) { return this.value('list_min', next) ?? null }
		list_max(next?: number | null) { return this.value('list_max', next) ?? null }
		length_min(next?: number | null) { return this.value('length_min', next) ?? null }
		length_max(next?: number | null) { return this.value('length_max', next) ?? null }

		title() {
			return `${this.id()} ${this.name()} ${this.hint()}`
		}
	}
}

