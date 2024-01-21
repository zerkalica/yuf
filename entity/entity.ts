namespace $ {
	export class $nxr_entity extends $mol_object {
		constructor(id?: string) {
			super()
			if (id) this.id = $mol_const(id)
		}

		@ $mol_mem_key
		static factory<Entity extends $nxr_entity>(
			this: { new(id?: string) : Entity },
			id: string
		) {
			return new this(id)
		}

		// @ts-ignore
		@ $mol_action
		static add<Entity extends $nxr_entity>(
			this: { new() : Entity },
			data: Partial<ReturnType<Entity['defaults']>> & { id?: string }
		): Entity {
			const id = data?.id ?? (this as unknown as { create_id(): string }).create_id()

			const entity = (this as unknown as {
				factory(id: string): Entity
			}).factory(id)

		    entity.data(data)

		    const t = this as unknown as {
				ids(next?: readonly string[]): readonly string[]
		    }

		    t.ids([ ... t.ids(), id ])

		    return entity
		}

		@ $mol_mem
		static ids(next?: readonly string[]) {
			return this.$.$mol_state_local.value(this.name, next) ?? []
		}

		@ $mol_mem_key
		static search<Entity extends $nxr_entity>(
			this: {
				new() : Entity,
				$: $
				ids(next?: readonly string[]): readonly string[]
			},
			data: Partial<ReturnType<Entity['defaults']>>
		) {
			return this.ids()
		}

		// @ts-ignore
		@ $mol_action
		static remove<Entity extends $nxr_entity>(
			this: {
				new() : Entity,
				$: $
				ids(next?: readonly string[]): readonly string[]
			},
			id: string
		) {
			this.ids(this.ids().filter(target_id => id !== target_id ))
		}

		@ $mol_action
		static create_id(group = '') {
			return $mol_guid()
		}

		protected rep() {
			return this.constructor as typeof $gd_kit_entity
		}

		@ $mol_mem
		id() {
			return this.rep().create_id()
		}

		defaults() {
			return {}
		}

		@ $mol_mem
		data( patch?: Partial<ReturnType<typeof this['defaults']>> | null | false) {
			const id = this.id()
			if (patch === null) this.rep().remove(id)

			const next = patch ? { ...this.defaults(), ...patch } : (patch === null ? patch : undefined)

			return (this.$.$mol_state_local.value(id, next) ?? null) as null | ReturnType<typeof this['defaults']>
		}

		remove() { this.data(null) }
		refresh() { this.data(false) }

		@ $mol_mem
		protected draft(next?: ReturnType<typeof this['data']> | null) {
			return next ?? null
		}

		@ $mol_mem_key
		value<
			Field extends keyof NonNullable<ReturnType< this['data'] >>
		>(
			field: Field,
			value?: NonNullable<ReturnType< this['data'] >>[ Field ] | null,
		): NonNullable<ReturnType< this['data'] >>[ Field ] {
			const data = this.draft() ?? this.data()

			if (value === undefined) {
				return data?.[field as never] as NonNullable<ReturnType< this['data'] >>[ Field ]
			}

			// В data() может быть асинхронная логика
			// Если записывать в value не дожидаясь завершения (например в mol_wire_race в цикле в mol_form_draft.submit),
			// то без draft каждый вызов value будет data на момент первого вызова value
			// Из-за спреда, кадый последующий вызов value не учтет изменения от предыдущего
			const next = { ...data, [ field ]: value } as ReturnType<typeof this['data']>
			this.draft(next)

			try {
				const result = this.data( next )?.[ field as never ] as NonNullable<ReturnType< this['data'] >>[ Field ]
				this.draft(null)
				return result
			} catch (e) {
				if ($mol_fail_catch(e)) this.draft(null)
				$mol_fail_hidden(e)
			}
		}

	}

}
