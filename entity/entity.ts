namespace $ {
	export class $yuf_entity extends $mol_object {
		id() { return '' }

		defaults() {
			return {}
		}

		@ $mol_mem
		data( full?: ReturnType<typeof this['defaults']> | null) {
			return full ?? null
		}

		@ $mol_mem
		patch( patch?: Partial<ReturnType<typeof this['defaults']>> | null) {
			const full = patch
				? { ...this.defaults(), ...patch } as ReturnType<typeof this['defaults']>
				: (patch === null ? null : undefined)

			return this.data(full) ?? null
		}

		@ $mol_mem
		saving() {
			const patch = this.draft()
			if (! patch) return false

			this.patch(patch)

			return false
		}

		abort() { this.draft(null) }

		@ $mol_mem
		protected status() {
			try {
				this.saving()
				return false
			} catch (e) {
				if ( $mol_promise_like(e) ) return true
				return e as Error
			}
		}

		@ $mol_mem
		pending() {
			return this.status() === true
		}

		@ $mol_mem
		error() {
			const status = this.status()
			return status instanceof Error ? status : null
		}

		@ $mol_action
		save(next: Partial<ReturnType<typeof this['defaults']>> | null) {
			this.draft(next)
			this.saving()
		}

		remove() {
			this.patch(null)
		}

		/**
		 * @example
		 * ```ts
		 * // Для неблокирующего режима при создании пользователя
		 * const id = create_id()
		 * const user = user_repo.factory(id) // instanceof $yuf_entity
		 * user.draft(user_form_data)
		 * 
		 * user_list.add(user)
		 * // Пока вытягивается saving, юзер будет сохраняться: user.saving() ? 'Saving' : 'Persisted'
		 * // Если передумали сохранять: user.abort()
		 * ```
		 */
		@ $mol_mem
		draft(next?: Partial<ReturnType<typeof this['patch']>> | null) {
			return next ?? null
		}

		@ $mol_mem_key
		value<
			Field extends keyof NonNullable<ReturnType< this['patch'] >>
		>(
			field: Field,
			value?: NonNullable<ReturnType< this['patch'] >>[ Field ] | null,
		): NonNullable<ReturnType< this['patch'] >>[ Field ] {
			// try { this.synced() } catch (error) {}
			const data = this.draft() ?? this.patch()
			if (value === undefined) {
				return data?.[field as never] as NonNullable<ReturnType< this['patch'] >>[ Field ]
			}

			// В data() может быть асинхронная логика
			// Если записывать в value не дожидаясь завершения (например в mol_wire_race в цикле в mol_form_draft.submit),
			// то без draft каждый вызов value будет data на момент первого вызова value
			// Из-за спреда, кадый последующий вызов value не учтет изменения от предыдущего
			const next = { ...data, [ field ]: value } as ReturnType<typeof this['patch']>
			this.save(next)
			const result = this.patch()?.[ field as never ] as NonNullable<ReturnType< this['patch'] >>[ Field ]
			return result
		}

	}

}
