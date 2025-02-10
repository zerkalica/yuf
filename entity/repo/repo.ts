namespace $ {
	export class $yuf_entity_repo extends $yuf_entity {
		@ $mol_mem_key
		static factory<Entity extends $yuf_entity>(
			this: { new(id?: string) : Entity },
			id: string
		) {
			return new this(id)
		}

		// @ts-ignore
		@ $mol_action
		static add<Entity extends $yuf_entity>(
			this: { new() : Entity },
			data?: Partial<ReturnType<Entity['defaults']>> & { id?: string }
		): Entity {
			const id = data?.id ?? (this as unknown as { create_id(): string }).create_id()

			const entity = (this as unknown as {
				factory(id: string): Entity
			}).factory(id)

		    entity.patch(data ?? {})

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
		static search<Entity extends $yuf_entity>(
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
		static remove<Entity extends $yuf_entity>(
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
			return this.constructor as typeof $yuf_entity_repo
		}

		@ $mol_mem
		override id() {
			return this.rep().create_id()
		}

		@ $mol_mem
		override data( full?: ReturnType<typeof this['defaults']> | null | false) {
			const id = this.id()
			if (full === null) this.rep().remove(id)

			return (this.$.$mol_state_local.value(id, full) ?? null) as null | ReturnType<typeof this['defaults']>
		}
	}
}
