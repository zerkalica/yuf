namespace $ {
	export class $yuf_entity2<Data = unknown> extends $mol_object {
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

		protected static drafts(next?: Record<string, [store_id: string, tmp_data: unknown] | null> | null) {
			return this.$.$mol_state_local.value(`${this}.drafts()`, next) || {}
		}

		protected static drafts_patch(next?: Record<string, [store_id: string, tmp_data: unknown] | null> | null) {
			const prev = this.drafts()
			if (next === undefined) return prev

			next = { ...prev, ...next }

			let keys_count = 0

			for (let k in next) {
				if (! next[k]) delete next[k]
				else keys_count++
			}

			if (! keys_count) next = null

			return this.drafts(next)
		}

		@ $mol_mem_key
		static draft_ids_by_store(store_id: string, next?: string) {
			const ids = this.drafts_patch(next ? { [next]: [ store_id, {} ] } : undefined)

			return Object.keys(ids).filter(id => ids[id]?.[0] === store_id)
		}

		@ $mol_mem_key
		protected static draft_data<Data>(id: string, next?: Partial<Data> | null) {
			const ids_prev = this.drafts_patch()[id]
			if (! ids_prev?.[0] ) return next ?? null

			if (next === undefined) return ids_prev[1] ?? null

			return this.drafts_patch({ [id]: next ? [ ids_prev[0], next ] : next })[id]?.[1] ?? null
		}

		static is_draft(id: string) { return !! this.drafts_patch()[id] }

		@ $mol_mem
		is_draft() { return this.$.$yuf_entity2.is_draft(this.id()) }

		_id = ''
		store = null as null | $yuf_entity2_store

		id() { return this._id }

		defaults(raw?: {}) { return {} as Data }

		mock(prev?: Data | null): Data | null {
			return null
		}

		mock_periodically() { return false }


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
			const pushing = this.factory().pushing()
			const prev = $mol_wire_probe(() => this.draft()) ?? null

			// merge with prev object, while debouncing
			const draft = next ? this.merge(next, prev) : next

			const removing = flag === 'removing' && ! this.is_draft()

			if (next !== undefined) this.removing(removing)

			if (flag === 'pushing' || removing) {
				pushing.add(this)
			} else if (next === null) pushing.delete(this)

			return this.$.$yuf_entity2.draft_data(this.id(), draft)
		}

		actual(next?: Partial<Data> | null, refresh?: 'refresh') {
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

			const data = removing || ! draft ? null :
				this.patch_enabled() ? draft : this.defaults(this.merge(draft))

			const actual = this.actual(data)
			// broken backend returns undefined data on push,
			// it converts to empty object in $yuf_ws_statefull.message_data
			// if removing true - do not merge with prev value, assume null - object deleted
			const result = actual && ! removing ? this.merge(actual, data) : null

			// Call before draft(null) - is_draft result cached in fiber
			const is_created = this.is_draft()
			const next_id = (actual as { id?: string }).id ?? this.id()

			const server_accepts_client_id = next_id === this.id()

			// Subscribe, only if server accepts client id on creating
			// If server return new id, this entity need to be unsubscribed
			if ( is_created && server_accepts_client_id ) {
				// Pull actual data to subscribe to server data changes
				this.actual(null, 'refresh')
			}

			// Null draft before pulling data, without nulled draft data do not pull actual
			this.draft(null)

			// Pull data to subscribe to actual changes, if created - we never pull actual before
			this.data()

			if ( is_created ) {
				// Try optimistically add id, returned by server to ids list in store
				this.store?.id_add(next_id)
			}
			this._id = next_id

			return result
		}

		remove() {
			this.data(null)
			this.store?.id_remove(this.id())
		}

	}
}
