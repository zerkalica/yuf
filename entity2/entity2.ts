namespace $ {
	type Draft_data<Data = unknown> = [
		store_id?: string | null,
		tmp_data?: Data | null,
		flag?: 'remove' | 'patch' | null
	]

	export class $yuf_entity2<Data = unknown> extends $mol_object {
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

		protected static drafts(next?: Record<string, Draft_data | null> | null) {
			return this.$.$mol_state_local.value(`${this}.drafts()`, next) ?? {}
		}

		protected static drafts_patch(next?: Record<string, Draft_data | null> | null) {
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

		static draft_id_create() { return $mol_guid() }

		@ $mol_mem_key
		static draft_ids(store_id: string, draft_ids?: readonly string[]) {
			const ids = this.drafts_patch(draft_ids
				? Object.fromEntries(draft_ids.map(draft_id => [ draft_id || this.draft_id_create(), [ store_id ] ]))
				: draft_ids
			)

			return Object.keys(ids).filter(id => ids[id]?.[0] === store_id)
		}

		protected static draft_data<Data>(id: string, next?: Draft_data<Data> | null) {
			const prev = this.drafts_patch()[id] as typeof next ?? null
			if (next === undefined) return prev

			return this.drafts_patch({ [id]: next === null ? next : [
				prev?.[0], // store_id
				next[1], // data
				next[2] === undefined ? prev?.[2] : next[2] // flag
			] })[id] as typeof next ?? null
		}

		static is_draft(id: string) { return !! this.draft_data(id)?.[0] }

		protected draft_data(next?: Draft_data<Partial<Data>> | null) {
			return this.$.$yuf_entity2.draft_data(this.id(), next)
		}

		@ $mol_mem
		is_draft() {
			// if store_id exists - data is creating
			return !! this.draft_data()?.[0]
		}

		@ $mol_mem
		draft( next?: Partial<Data> | null, flag?: 'remove' | 'patch'): Partial<Data> | null {
			const prev = this.draft_data()?.[1] ?? null

			// merge with prev object, while debouncing
			const draft = next ? this.merge(next, prev) : null

			return this.draft_data(
				next === undefined || (next === null && ! flag)
					? next
					: [null, draft, flag]
			)?.[1] ?? null
		}

		_id = ''
		store = null as null | $yuf_entity2_store

		id() { return this._id }

		defaults(raw?: {}) { return {} as Data }

		mock(prev?: Data | null): Data | null {
			return null
		}

		mock_periodically() { return false }

		@ $mol_mem_key
		draft_value<Field extends keyof Data>(field: Field, next?: Data[ Field ] | null) {
			const draft = this.draft(
				next === undefined ? undefined : { [field]: next } as Partial<Data>
			)?.[ field ] ?? null

			return draft === undefined ? this.value(field) : (draft ?? null)
		}

		@ $mol_mem_key
		value<Field extends keyof Data>(field: Field, next?: Data[ Field ] | null) {
			return this.data(
				next === undefined ? undefined : { [field]: next } as Partial<Data>
			)?.[ field ] ?? this.defaults()[field]
		}

		actual(next?: Partial<Data> | null, refresh?: 'refresh') {
			// sync logic
			return next ?? null
		}

		@ $mol_mem
		data(next?: Partial<Data> | null, cache?: 'cache'): Data | null {
			let actual
			const is_creating = this.is_draft()

			if (next === undefined) {
				actual = is_creating ? this.draft() : this.actual()
			} else if (cache) {
				actual = next
			} else {
				actual = this.pushing_set(next)
				// Call before draft(null) - is_draft result cached in fiber
				const server_id = actual ? this.server_created_id(actual) : null
				const id = this.id()
				const next_id = server_id ?? id

				if ( is_creating && next_id === id && id) {
					// If server accepts client id on creating - need to subscribe
					// On creating we never pull actual data and not subscribed to server changes
					// sending yuf_ws_statefull_channel.data 'refresh' causing subscription to socket data changes
					this.actual(null, 'refresh')
				}

				if ( is_creating && next_id) {
					// Try optimistically add id to ids list
					// Needed on bad servers without ids list changes notification
					this.store?.id_add(next_id)
				}

			}

			if (actual === null) return null
			if (actual instanceof Error) return actual as Data

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

		@ $mol_mem
		pushing() {
			const [, draft, flag] = this.draft_data() ?? []
			const removing = flag === 'remove'
			const patching = flag === 'patch'
			if (! patching && ! removing) return null

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
			const result = actual ? this.merge(actual, data) : null

			// Null draft before pulling data, without nulled draft data do not pull actual
			// Warning - do not allow suspends after draft(null)
			this.draft(null)

			// Pull data to subscribe to actual changes, if created - we never pull actual before
			this.data()

			return result
		}

		@ $mol_action
		pushing_set(next: Partial<Data> | null) {
			this.draft(next, next === null ? 'remove' : 'patch')
			// trick with pushing mem needed for debounce and serial push
			return this.pushing()
		}

		protected server_created_id(actual: Partial<Data>) {
			return ! Array.isArray(actual) ? (actual as { id?: string }).id || null : null
		}

		remove() {
			this.data(null)
			const id = this.id()
			id && this.store?.id_remove(id)
		}

	}

}
