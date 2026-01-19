namespace $ {
	export class $yuf_entity2<Data = unknown> extends $mol_object {
		protected factory() {
			return this.$.$yuf_entity2
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

		protected static draft_creator_ids(next?: Record<string, string | null> | null) {
			const key = `${this}.draft_creator_ids()`
			const storage = this.$.$mol_state_local

			const prev = storage.value<Record<string, string | null>>(key)

			if (next === undefined) return prev ?? {}

			next = { ...prev, ...next }

			for (let k in next) {
				if (! next[k]) delete next[k]
			}

			return storage.value(key, next) ?? {}
		}

		static draft_id_create() { return $mol_guid() }

		@ $mol_mem_key
		static draft_ids(creator_id: string, draft_ids?: readonly string[]) {

			const draft_creator_dict = this.draft_creator_ids(
				! draft_ids ? draft_ids : Object.fromEntries(draft_ids.map(
					draft_id => [ draft_id || this.draft_id_create(), creator_id ]
				))
			)

			return Object.keys(draft_creator_dict).filter(id => draft_creator_dict[id] === creator_id)
		}

		@ $mol_mem_key
		static creator_id(draft_id: string, next?: null) {
			return this.draft_creator_ids(next === null ? { [draft_id]: null } : undefined)[draft_id] ?? null
		}

		@ $mol_mem_key
		static draft<Data>(id: string, next?: Data | null, flag?: 'mem-only') {
			if (flag === 'mem-only') return next ?? null
			return this.$.$mol_state_local.value(`${this}.draft("${id}")`, next) ?? null
		}

		@ $mol_mem
		is_draft(next?: null, flag?: 'storage') {
			const id = this.id()
			const factory = this.factory()
			const is_draft = Boolean(factory.creator_id(id))
			if (next !== null) return is_draft
			factory.creator_id(id, next)
			return flag === 'storage' ? is_draft : false
		}

		// Big values cant store in localStorage due browser quota - only in memory
		draft_mem_only() {
			return false
		}

		@ $mol_mem
		draft( next?: Partial<Data> | null, flag?: 'storage' | 'fill'): Partial<Data> | null {
			const id = this.id()
			const factory = this.factory()
			const prev = factory.draft<typeof next>(id)
			if (next === undefined) return prev

			if (next || flag === 'fill') {
				// merge with prev object, while debouncing
				const merged = this.merge(next ?? this.data() ?? this.defaults(), prev)
				return factory.draft(id, merged, this.draft_mem_only() ? 'mem-only': undefined)
			}

			// null - delete from storage
			const result = factory.draft(id, next)
			this.is_draft(next, flag)
			if (flag === 'storage') return prev
			return result
		}

		_id = ''

		id() { return this._id }

		defaults(raw?: {}) { return {} as Data }

		/**
		 * 
		 * @returns undefined - response without body
		 */
		mock(prev?: Data | null): Data | null | undefined {
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

			if (next === undefined) {
				actual = this.is_draft() ? this.draft() : this.actual()
			} else if (cache) {
				actual = next
			} else if ( next === null ) {
				// null - remove without debounce
				actual = this.is_draft() ? this.draft(next, 'storage') : this.actual(next)
			} else {
				actual = this.actual_push_debounced(next)
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
		protected actual_push_task() {
			const draft = this.draft()
			const is_creating = this.is_draft()
			if (! draft) return null

			const debounce_timeout = this.debounce_timeout()
			if (debounce_timeout) {
				// Workaround, can't debounce on $mol_wait_timeout
				// see https://github.com/hyoo-ru/mam_mol/issues/739
				this.$.$yuf_wait_timeout(debounce_timeout)
			}

			const data = this.patch_enabled() ? draft : this.defaults(this.merge(draft))

			const actual = this.actual(data)
			// broken backend returns undefined data on push,
			// it converts to empty object in $yuf_ws_statefull.message_data
			const result = actual ? this.merge(actual, data) : null

			if (! is_creating) {
				this.draft(null)
				return result
			}

			const server_id = actual ? this.server_created_id(actual) : null
			const id = this.id()

			if (! server_id || server_id === id) {
				// Server accepts client id on create - just resubscribe to server entity changes and then remove draft
				this.resubscribe()
				return result
			}

			this.$.$mol_log3_warn({
				place: `${this.constructor}.pushing`,
				message: 'server creates new id, entity is dead',
				name: this.toString(),
				hint: 'Avoid non-idempotent server API when creating entities',
			})

			// If server not returns id or server creates new id - current entity is dead
			// do not use dead entity anywhere, remove it from list
			// In app add to list created entity by id from dead_entity.server_created_id()

			// draft cleared only in localStorage, not in memory to prevent actual call on dead entity
			this.draft(null, 'storage')

			return result
		}

		@ $mol_action
		protected resubscribe() {
			// if server accepts client id - after push to actual need resubscribe to track changes
			// Without frame data returns null and breaks fibers, if this.data called before actual_push_task end
			new $mol_after_frame($mol_wire_async(() => this.actual(null, 'refresh')))

			// clear draft and pull data to subscribe to actual
			this.draft(null)
			this.data()
		}

		@ $mol_action
		actual_push_debounced(next: Partial<Data> | null) {
			this.draft(next)
			// trick with pushing mem needed for debounce and serial push
			return this.actual_push_task()
		}

		@ $mol_action
		server_created_id(actual: Partial<Data> | null = this.data()) {
			return ! Array.isArray(actual) ? (actual as { id?: string }).id || null : null
		}

		@ $mol_action
		remove() {
			this.data(null)
		}

	}

}
