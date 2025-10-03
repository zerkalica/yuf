namespace $ {
	export class $yuf_entity2 extends $mol_object {
		id() { return '' }

		defaults(raw?: {}) { return {} }

		mock(prev?: ReturnType<this['defaults']> | null): ReturnType<this['defaults']> | null {
			return null
		}

		@ $mol_mem_key
		value<
			Field extends keyof ReturnType< this['defaults'] >
		>(
			field: Field,
			next?: ReturnType< this['defaults'] >[ Field ] | null,
		): ReturnType< this['defaults'] >[ Field ] {
			const data = this.data( next === undefined
				? undefined
				: { [field]: next } as Partial<ReturnType<this['defaults']>>
			)

			return data?.[ field as never ] as ReturnType< this['defaults'] >[ Field ]
		}

		@ $mol_mem
		draft(next?: Partial<ReturnType<this['defaults']>> | null): Partial<ReturnType<this['defaults']>> | null {
			const prev = $mol_wire_probe(() => this.draft())
			// collect object, while debouncing
			return next ? this.merge(next, prev) : (next ?? null)
		}

		@ $mol_mem
		removing(next?: boolean) {
			return next ?? false
		}

		actual(next?: Partial<ReturnType<this['defaults']>> | null) {
			// sync logic
			return next ?? null
		}

		protected registered() {}

		@ $mol_mem
		data(
			next?: Partial<ReturnType<this['defaults']>> | null,
			cache?: 'cache'
		): ReturnType<this['defaults']> | null {
			let actual = cache ? next : undefined

			this.registered()
			if (next === undefined) {
				// undefined - subscribe to entity changes
				actual = this.actual()
			}

			if ( (next || next === null) && ! cache ) {
				if (next) this.draft(next)
				if (next === null) this.removing(true)
				actual = this.pushing()
			}

			if (next instanceof Error) return next as ReturnType<this['defaults']>

			if (actual === null || actual instanceof Error) return actual as ReturnType<this['defaults']>

			const result = this.merge_prev(actual)
			return result
		}

		merge(actual: Partial<ReturnType<this['defaults']>> | undefined, prev?: typeof actual | null) {
			if (actual instanceof Array) return actual
			return { ...prev, ...actual }
		}

		merge_prev(patch: Partial<ReturnType<this['defaults']>> | undefined) {
			const prev = $mol_wire_probe(() => this.data())
			return this.defaults(this.merge(patch, prev)) as ReturnType<this['defaults']>
		}

		debounce_timeout() { return 100 }

		@ $mol_mem
		pushing() {
			const draft = this.draft()
			const removing = this.removing()
			if (! draft && ! removing) return null

			const debounce_timeout = this.debounce_timeout()
			if (debounce_timeout) this.$.$yuf_wait_timeout(debounce_timeout)

			const data = removing || ! draft ? null : this.merge_prev(draft)

			try {
				const actual = this.actual(data)
				const result = actual ? this.merge(actual, draft) : null

				this.draft(null)
				this.removing(false)
				return result
			} catch (e) {
				if ( ! $mol_promise_like(e) ) {
					this.draft(null)
					this.removing(false)
				}

				$mol_fail_hidden(e)
			}
		}

		deadline_timeout() { return 5000 }

	}
}
