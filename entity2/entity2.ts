namespace $ {
	export class $yuf_entity2<Data = unknown> extends $mol_object {
		@ $mol_memo.field
		static get _() { return new this() }

		@ $mol_mem
		protected static pushing() {
			return new $mol_wire_set<$yuf_entity2>()
		}

		@ $mol_mem
		static syncing() {
			let syncing = false
			const errors = [] as Error[]

			for (const model of this.pushing()) {
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

		defaults(raw?: {}) { return {} as Data }

		mock(prev?: Data | null): Data | null {
			return null
		}

		mock_periodically() { return false }

		@ $mol_mem
		static tmp_ids(next?: readonly string[] | null, remove?: 'remove'): readonly string[] {
			let prev = $mol_wire_probe(() => this.tmp_ids()) ?? []
			if (next) prev = prev.filter(id => ! next!.includes(id))

			if (remove) next = prev
			if (next && ! remove) next = [ ... prev, ... next ]
			if (next && ! next.length) next = null

			return this.$.$mol_state_local.value(`${this}.tmp_ids()`, next) || []
		}

		is_draft() {
			const ids = this.$.$yuf_entity2.tmp_ids()
			const id = this.id()
			return ids.includes(id)
		}

		@ $mol_mem_key
		value<
			Field extends keyof Data
		>(
			field: Field,
			next?: Data[ Field ] | null,
			draft?: 'draft'
		): Data[ Field ] {
			const patch = next === undefined || draft
				? undefined
				: { [field]: next } as Partial<Data>

			if (draft) {
				const draft = this.draft(patch)?.[field]
				if (draft !== undefined) return draft
			}

			return this.data( patch )?.[ field ] as Data[ Field ]
		}

		@ $mol_mem
		protected removing(next?: boolean) { return next ?? false }

		@ $mol_mem
		draft( next?: Partial<Data> | null, flag?: 'removing' | 'pushing'): Partial<Data> | null {
			if (next === undefined) return null

			const pushing = this.factory().pushing()
			const prev = $mol_wire_probe(() => this.draft()) ?? null

			// merge with prev object, while debouncing
			const draft = next === null ? next : this.merge(next, prev)

			this.removing(flag === 'removing')
			if (flag === 'pushing' || flag === 'removing') pushing.add(this)
			if (! flag && next === null) pushing.delete(this)

			return draft
		}

		actual(next?: Partial<Data> | null) {
			// sync logic
			return next ?? null
		}

		@ $mol_mem
		data(next?: Partial<Data> | null, cache?: 'cache'): Data | null {
			let actual

			if (next === undefined) {
				actual = this.is_draft() ? this.draft() : this.actual()
			} else if (cache) {
				actual = next
			} else {
				this.draft(next, next === null ? 'removing' : 'pushing')
				actual = this.pushing()
			}

			if (actual === null) return null

			if (actual instanceof Error) {
				return actual as Data
			}

			return this.defaults(this.merge(actual))
		}

		merge(
			actual: Partial<Data>,
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
