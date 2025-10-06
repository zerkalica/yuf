namespace $ {
	export class $yuf_entity2 extends $mol_object {
		protected static pushing = new $mol_wire_set<$yuf_entity2>()

		@ $mol_mem
		static syncing() {
			let syncing = false
			for (const model of this.pushing) {
				try {
					model?.pushing()
				} catch (e) {
					if ($mol_promise_like(e)) syncing = true
				}
			}
			return syncing
		}

		protected factory() {
			return this.constructor as typeof $yuf_entity2
		}

		protected static active = {} as Record<string, $yuf_entity2>

		static active_model(signature: {}) {
			return this.active[JSON.stringify(signature)] ?? null
		}

		protected propagate() {
			if (this.$.$yuf_entity2.prototype.mock === this.mock) return
			this.factory().active[this.toString()] = this
		}

		protected destructed = false

		override destructor() {
			this.destructed = true
			if (this.$.$yuf_entity2.prototype.mock === this.mock) return
			delete this.factory().active[this.toString()]
		}

		id() { return '' }

		defaults(raw?: {}) { return {} }

		mock(prev?: ReturnType<this['defaults']> | null): ReturnType<this['defaults']> | null {
			return null
		}

		mock_periodically() { return false }

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

		receive(next: Partial<ReturnType<this['defaults']>> | null) {
			try {
				this.data(next, 'cache')
			} catch (err) {
				// Error from socket pushed to mem causes exception, ignore it
				if (err !== next) $mol_fail_hidden(err)
			}
		}

		@ $mol_mem
		data(
			next?: Partial<ReturnType<this['defaults']>> | null,
			cache?: 'cache'
		): ReturnType<this['defaults']> | null {
			let actual = cache ? next : undefined
			if (this.destructed) {
				// Restarts after destruction
				// Bug in https://github.com/hyoo-ru/mam_mol/commit/0b4b1c9e2bcd252fde21f43c9d092885c104aebe
				// https://t.me/mam_mol/166228
				return null
			}

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

			return this.merge_prev(actual)
		}

		merge(actual: Partial<ReturnType<this['defaults']>> | undefined, prev?: typeof actual | null) {
			// broken back returns undefined data on push, it converts to empty object in ws statefull
			// convert it to prev value
			if (this.defaults() instanceof Array) {
				if (actual instanceof Array) return actual as ReturnType<this['defaults']>
				return prev ?? [] as ReturnType<this['defaults']>
			}

			return { ...prev, ...actual }
		}

		merge_prev(patch: Partial<ReturnType<this['defaults']>> | undefined) {
			const prev = $mol_wire_probe(() => this.data())
			const merged = this.merge(patch, prev)

			return this.defaults(merged) as ReturnType<this['defaults']>
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
			const pushing = this.factory().pushing

			try {
				pushing.add(this)
				const actual = this.actual(data)
				const result = actual ? this.merge(actual, draft) : null

				pushing.delete(this)
				this.draft(null)
				this.removing(false)
				return result
			} catch (e) {
				if ( ! $mol_promise_like(e) ) {
					pushing.delete(this)
					this.draft(null)
					this.removing(false)
				}

				$mol_fail_hidden(e)
			}
		}

		deadline_timeout() { return 5000 }

	}
}
