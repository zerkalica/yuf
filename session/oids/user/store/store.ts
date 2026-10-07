namespace $ {
	const rec = $mol_data_record
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const str = $mol_data_string
	const num = $mol_data_number
	const bool = $mol_data_boolean
	const arr = $mol_data_array
	const dict = $mol_data_dict
	const vr = $mol_data_variant

	type Preloaded_data = typeof $yuf_session_oids_user_model_dto.Value

	/**
	 * @example
	 * ```json
	{
		"name": "username",
		"displayName": "Логин",
		"required": true,
		"readOnly": true,
		"annotations": {
			"description": "Логин пользователя"
		},
		"validators": {
			"multivalued": {
				"max": "1"
			},
			"pattern": {
				"pattern": "^[a-zA-Z0-9]{1,18}$",
				"ignore.empty.value": true
			}
		},
		"multivalued": false
	}
	```
	*/
	const attr_dto = rec({
		name: opt(nul(str)),
		displayName: opt(nul(str)),
		required: opt(nul(bool)),
		readOnly: opt(nul(bool)),

		annotations: opt(nul(rec({
			description: opt(nul(str)),
		}))),

		multivalued: opt(nul(bool)),
		validators: opt(nul(rec({
			multivalued: opt(nul(rec({
				min: opt(nul(str)),
				max: opt(nul(str)),
			}))),
			pattern: opt(nul(rec({
				pattern: opt(nul(str)),
				'ignore.empty.value': opt(nul(bool)),
			}))),
		}))),
	})

	const subgroup_dto = rec({
		id: str,
		name: opt(nul(str)),
		path: opt(nul(str)),
	})

	const group_dto = rec({
		... subgroup_dto.config,
		subGroups: opt(nul(arr(rec({
			... subgroup_dto.config,
			subGroups: opt(nul(arr(rec({
				... subgroup_dto.config,
				subGroups: opt(nul(arr(subgroup_dto))),
			})))),
		})))),
	})

	const attr_group_dto = rec({
		name: str,
		displayDescription: opt(nul(str)),
		displayHeader: opt(nul(str)),
		annotations: opt(nul(dict($yuf_data_unknown))),
	})

	const meta_dto = rec({
		attributes: opt(nul(arr(attr_dto))),
		groups: opt(nul(arr(attr_group_dto)))
	})

	const Meta_response = $yuf_session_oids_response_data(meta_dto)

	const role_dto = rec({
		id: str,
		name: opt(nul(str)),
		description: opt(nul(str)),
		clientRole: opt(nul(bool)),
		composite: opt(nul(bool)),
	})

	const Roles_response = $yuf_session_oids_response_data(arr(role_dto))

	const Groups_response = $yuf_session_oids_response_data(arr(group_dto))

	export const $yuf_session_oids_user_store_dto = arr($yuf_session_oids_user_model_dto)
	const Users_response = $yuf_session_oids_response_data($yuf_session_oids_user_store_dto)

	const parse_num = (num: string | undefined | null) => typeof num === 'string' ? Number(num) : undefined

	const partial_import_dto = rec({
		added: opt(nul(num)),
		overwritten: opt(nul(num)),
		skipped: opt(nul(num)),
	})

	const Partial_import_response = $yuf_session_oids_response_data(partial_import_dto)

	function attr_normalize(attr: typeof attr_dto.Value): $yuf_form_attr_type {
		return {
			type: attr.name?.includes('date') ? 'date' : 'string',
			name: attr.displayName || '',
			hint: attr.annotations?.description || undefined,
			mask: attr.validators?.pattern?.pattern || '',
			required: attr.required ?? false,
			enabled: attr.readOnly ?? false,
			min: parse_num(attr.validators?.multivalued?.min),
			max: parse_num(attr.validators?.multivalued?.max),
		}
	}

	export class $yuf_session_oids_user_store extends $mol_object {
		session() { return this.$.$mol_one.$yuf_session_oids }

		protected is_admin() { return this.session().can_users_view() }
		protected response(url: string, init?: RequestInit) { return this.session().response(url, init) }
		protected endpoint(k: $yuf_session_oids_endpoint, params?: $yuf_session_oids_params) {
			return this.session().endpoint(k, params)
		}

		@ $mol_mem
		attrs() {
			const url = this.is_admin()
				? this.endpoint('metadata')
				:  this.endpoint('account', { userProfileMetadata: 'true' })

			const res = this.response(url)
			const recs = Meta_response(res)

			const result = {} as Record<string, $yuf_form_attr_type>
			for (const attr of recs?.attributes ?? []) {
				if (! attr.name) continue
				result[attr.name] = attr_normalize(attr)
			}

			return result
		}

		@ $mol_mem
		attr_ids() {
			const attrs = this.attrs()
			return Object.keys(attrs).filter(id => id !== 'username')
		}

		@ $mol_mem_key
		attr(key: string) {
			return this.$.$yuf_form_attr.make({ data: () => this.attrs()[key] ?? {} })
		}

		@ $mol_action
		make_empty() {
			const id = 'tmp_' + $mol_guid()
			const user = this.by_id(id)

			return user
		}

		@ $mol_mem
		deleted_ids(next?: readonly string[]): readonly string[] {
			$mol_wire_solid()
			const prev = $mol_wire_probe(() => this.deleted_ids())

			next?.forEach(id => this.by_id(id).data(null))

			return [ ...prev ?? [], ...next ?? [] ]
		}

		@ $mol_action
		protected users_chunk(
			{ first, max, enabled, search }: { search?: string, first?: number, max?: number, enabled?: boolean },
		) {
			const q: Record<string, string> = {
				briefRepresentation: 'true',
				first: String(first || '0'),
				max: String(max || '2000'),
			}

			if (search) q.search = search

			if (enabled || enabled === false) q.enabled = enabled ? 'true' : 'false'

			const res = this.response(this.endpoint('users', q))

			return Users_response(res)
		}

		@ $mol_action
		protected users_chunk_filtered(
			params: Parameters<typeof this.users_chunk>[0] & {
				activity?: 'all' | 'online'
			},
		) {
			const deleted_ids = this.deleted_ids()

			const is_online = params.activity === 'online' ? true : null
			const chunk = this.users_chunk(params)
			const users = chunk.filter(rec =>
				( is_online === null || is_online === this.by_id(rec.id).is_online() )
				&& ! deleted_ids.includes(rec.id)
			)

			return { end: chunk.length < ( params.max ?? 2000 ), users }
		}

		// @ $mol_mem_key
		protected users_chunks_filtered(params: Parameters<typeof this.users_chunk_filtered>[0], reset?: null) {
			let users = [] as ReturnType<typeof this.users_chunk>[number][]

			const max = this.chunk_max()
			const users_max = this.users_max()

			for (let first = 0; first < users_max; first += max) {
				const chunk = this.users_chunk_filtered({ ...params, first, max })
				users = users.concat(chunk.users)
				if (chunk.end) break
			}

			return users
		}

		protected chunk_max() { return 500 }
		protected users_max() { return 100_000 }

		@ $mol_mem_key
		ids({ order_by, ...params}: Parameters<typeof this.users_chunk>[0] & {
			activity?: 'all' | 'online'
			order_by?: `${'created' | 'modified' | 'login' | 'name' | string}${'' | '_desc'}`
		}, reset?: null) {
			const users = this.users_chunks_filtered(params, reset)

			const order_field = order_by?.replace('_desc', '')
			const desc = (order_by ?? undefined) !== (order_field ?? undefined)

			this._preloaded = {}

			users.sort((a_raw, b_raw) => {
				const a = desc ? b_raw : a_raw
				const b = desc ? a_raw : b_raw
				if (order_field === 'login') return (a.username ?? '').localeCompare(b.username ?? '')
				const aa_raw = a.attributes?.[order_field ?? '']
				const ba_raw = b.attributes?.[order_field ?? '']
				const aa: string = Array.isArray(aa_raw) ? aa_raw[0] ?? '' : ''
				const ba: string = Array.isArray(ba_raw) ? ba_raw[0] ?? '' : ''
				if (aa || ba ) return aa.localeCompare(ba)

				return (a.createdTimestamp ?? 0) - (b.createdTimestamp ?? 0)
			})

			return users.map(rec => (this._preloaded[rec.id] = rec).id)
		}

		@ $mol_mem_key
		by_id(id: string) {
			return this.$.$yuf_session_oids_user_model.make({
				id: $mol_const(id),
				store: () => this,
			})
		}

		protected _preloaded = {} as Record<string, Preloaded_data | null>
		preloaded(id: string, next?: Preloaded_data | null) {
			if (next === null) delete this._preloaded[id]
			if (next) this._preloaded[id] = next
			return next ?? this._preloaded[id]
		}

		@ $mol_mem_key
		protected roles_search({ search }: { search?: string | null }) {
			$mol_wire_solid()
			const response = this.response(this.endpoint('roles', search ? { search }: undefined))

			const roles = Roles_response(response)

			const hided = this.role_names_hided()
			return roles.filter(role => ! hided.includes(role.name ?? ''))
		}

		protected roles_data() { return this.roles_search({ search: null}) }

		role_names_hided() {
			return ['uma_authorization', 'offline_access']
		}

		@ $mol_mem
		role_names() {
			return Object.fromEntries( this.roles_data().map(rec => [ rec.id, rec.name || rec.id ]) )
		}

		@ $mol_mem
		role_hints() {
			return Object.fromEntries( this.roles_data().map(rec => [ rec.id, rec.description || '' ]) )
		}

		@ $mol_mem
		protected groups_data() {
			const response = this.response(this.endpoint('groups'))

			return Groups_response(response)
		}

		@ $mol_mem
		group_names() {
			return Object.fromEntries( this.groups_data().map(rec => [ rec.id, rec.name || rec.id ]) )
		}

		@ $mol_mem
		group_hints() {
			return Object.fromEntries( this.groups_data().map(rec => [ rec.id, rec.name || '' ]) )
		}

		@ $mol_action
		export_data(ids: readonly string[]) {
			this.ids({}) // preload
			const preloaded = this._preloaded
			const ids_not_loaded = ids.filter(id => ! preloaded[id])
			if (ids_not_loaded.length) throw new Error('Not loaded some ids', { cause: { ids_not_loaded } })

			return ids.map(id => preloaded[id]!)
		}

		@ $mol_action
		import_info(to_import: readonly Preloaded_data[]) {
			const ids = this.ids({}) // preload
			const preloaded = this._preloaded
			const existing_by_name = {} as typeof preloaded

			const to_create = [] as typeof to_import[number][]
			const to_update = [] as typeof to_import[number][]

			ids.forEach(id => {
				const name = preloaded[id]?.username ?? ''
				if (name) existing_by_name[name] = preloaded[id]
			})

			to_import.forEach(user => {
				const cur = existing_by_name[user.username ?? '']
				if (! cur) to_create.push(user)
				else to_update.push({ ...cur, ...user, id: cur.id })
			})

			return { to_create, to_update }
		}


		@ $mol_action
		protected import_body(users: readonly Preloaded_data[]) {
			return JSON.stringify({ ifResourceExists: 'SKIP', users })
		}

		@ $mol_action
		protected import_new(next: readonly Preloaded_data[]): typeof partial_import_dto.Value {
			const max = this.chunk_max()
			const users_max = this.users_max()

			const overall = { added: 0, overwritten: 0, skipped: 0 }

			for (let i = 0; i < users_max; i += max) {
				const users = next.slice(i, max)
				if (! users.length) break

				const res = this.response(this.endpoint('partialImport'), { method: 'POST', body: this.import_body(users) })

				const info = Partial_import_response(res)

				overall.added += info.added ?? 0
				overall.overwritten += info.overwritten ?? 0
				overall.skipped += info.skipped ?? 0
			}

			return overall
		}

		@ $mol_action
		protected update_user(next: Preloaded_data) {
			const user = this.by_id(next.id)
			const prev = user.data()

			$mol_error_fence(
				() => user.data({ ...prev, ...next }),
				e => new $mol_error_mix('User import error', { user_data: next }, e)
			)

			return user.login()
		}

		@ $mol_action
		import({ to_create, to_update }: {
			to_create: readonly Preloaded_data[]
			to_update: readonly Preloaded_data[]
		}) {
			const stat = this.import_new(to_create)

			const created = to_create.map(next => ! next.credentials?.length || ! next.id ? null : this.update_user({
				id: next.id,
				credentials: next.credentials
			})).filter($mol_guard_defined)

			const updated = to_update.map(next => this.update_user(next))

			return { stat, updated, created }
		}
	}

}
