namespace $ {
	export class $yuf_entity2 extends $mol_object {
		protected static pushing = new $mol_wire_set<$yuf_entity2>()

		@ $mol_mem
		static syncing() {
			let syncing = false
			const errors = [] as Error[]

			for (const model of this.pushing) {
				try {
					model?.pushing()
				} catch (e) {
					if ($mol_promise_like(e)) syncing = true
					else errors.push(e as Error)
				}
			}

			if (errors.length) {
				if (errors.length === 1) throw errors[0]
				throw new $mol_error_mix(errors[0].message, errors[0].cause ?? {}, ...errors)
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

		override destructor() {
			// remove itself from this.factory().pushing set
			this.draft(null)
			if (this.$.$yuf_entity2.prototype.mock === this.mock) return
			delete this.factory().active[this.toString()]
		}

		id() { return '' }

		defaults(raw?: {}) { return {} }

		mock(prev?: ReturnType<this['defaults']> | null): ReturnType<this['defaults']> | null {
			return null
		}

		mock_periodically() { return false }

		is_draft() { return this.id().startsWith('draft') }

		@ $mol_mem_key
		value<
			Field extends keyof ReturnType< this['defaults'] >
		>(
			field: Field,
			next?: ReturnType< this['defaults'] >[ Field ] | null,
			draft?: 'draft'
		): ReturnType< this['defaults'] >[ Field ] {
			const patch = next === undefined || draft
				? undefined
				: { [field]: next } as Partial<ReturnType<this['defaults']>>

			if (draft) {
				const draft = this.draft(patch)?.[field]
				if (draft !== undefined) return draft
			}

			return this.data( patch )?.[ field ] as ReturnType< this['defaults'] >[ Field ]
		}

		@ $mol_mem
		protected removing(next?: boolean) { return next ?? false }

		@ $mol_mem
		draft(
			next?: Partial<ReturnType<this['defaults']>> | null,
			flag?: 'removing' | 'creating'
		): NonNullable<typeof next> | null {

			if (next === undefined) return null

			this.removing(flag === 'removing')

			if (flag === 'creating') {
				this.data(next, 'cache')
			}

			const pushing = this.factory().pushing

			if (next === null) {
				pushing.delete(this)
				return null
			}
			pushing.add(this)

			const prev = $mol_wire_probe(() => this.draft()) ?? null

			// merge with prev object, while debouncing
			return this.merge(next, prev)
		}

		actual(next?: Partial<ReturnType<this['defaults']>> | null) {
			// sync logic
			return next ?? null
		}

		@ $mol_mem
		data(
			next?: Partial<ReturnType<this['defaults']>> | null,
			cache?: 'cache'
		): ReturnType<this['defaults']> | null {
			let actual

			if (next === undefined) {
				actual = this.is_draft() ? {} : this.actual()
			} else if (cache) {
				actual = next
			} else {
				this.draft(next, next === null ? 'removing' : undefined)
				actual = this.pushing()
			}

			if (actual === null) return null

			if (actual instanceof Error) {
				return actual as ReturnType<this['defaults']>
			}

			return this.defaults(this.merge(actual)) as ReturnType<this['defaults']>
		}

		merge(
			actual: Partial<ReturnType<this['defaults']>>,
			prev: typeof actual | undefined | null = $mol_wire_probe(() => this.data())
		) {
			// broken backend returns undefined data on push,
			// it converts to empty object in $yuf_ws_statefull.message_data
			// convert it to right type or return prev value if not undefined
			if (this.defaults() instanceof Array) {
				if (actual instanceof Array) return actual
				return prev ?? [] as unknown as typeof actual
			}

			return { ...prev, ...actual }
		}

		debounce_timeout() { return 100 }

		/**
		 * True if backend supports partial push
		 */
		patch_enabled() { return false }

		// Always pulled somewhere in app to track pushing status of each model
		@ $mol_mem
		pushing() {
			const draft = this.draft()
			const removing = this.removing()
			if (! draft && ! removing) return null

			const debounce_timeout = this.debounce_timeout()
			if (debounce_timeout) {
				// Workaround, can't debounce on $mol_wait_timeout
				// see https://github.com/hyoo-ru/mam_mol/issues/739
				this.$.$yuf_wait_timeout(debounce_timeout)
			}

			try {
				const data = removing || ! draft ? null :
					this.patch_enabled() ? draft : this.defaults(this.merge(draft))

				const actual = this.actual(data)
				// broken backend returns undefined data on push,
				// it converts to empty object in $yuf_ws_statefull.message_data
				// if removing true - do not merge with prev value, assume null - object deleted
				const result = actual && ! removing ? this.merge(actual, draft) : null
				this.draft(null)

				return result
			} catch (e) {
				if ( ! $mol_promise_like(e) ) this.draft(null)
				$mol_fail_hidden(e)
			}
		}

		remove() {
			if (this.is_draft()) return
			this.data(null)
		}

	}
}
