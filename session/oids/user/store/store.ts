namespace $ {
	const rec = $mol_data_record
	const str = $mol_data_string
	const num = $mol_data_number
	const bool = $mol_data_boolean
	const arr = $mol_data_array
	const nul = $yuf_data_nul

	const Meta_response = $yuf_session_oids_response_data($yuf_session_oids_user_model_meta_dto)

	const Role_rec = rec({
		id: str,
		name: nul(str),
		description: nul(str),
		clientRole: nul(bool),
		composite: nul(bool),
	})

	const Roles_response = $yuf_session_oids_response_data(arr(Role_rec))

	const Subgroup_rec = rec({
		id: str,
		name: nul(str),
		path: nul(str),
	})

	const Group_rec = rec({
		... Subgroup_rec.config,
		subGroups: nul(arr(rec({
			... Subgroup_rec.config,
			subGroups: nul(arr(rec({
				... Subgroup_rec.config,
				subGroups: nul(arr(Subgroup_rec)),
			}))),
		}))),
	})

	const Groups_response = $yuf_session_oids_response_data(arr(Group_rec))

	export const $yuf_session_oids_user_store_dto = arr($yuf_session_oids_user_model_dto)
	const Users_response = $yuf_session_oids_response_data($yuf_session_oids_user_store_dto)

	const parse_num = (num: string | undefined | null) => typeof num === 'string' ? Number(num) : undefined

	const Partial_import_rec = rec({
		added: nul(num),
		overwritten: nul(num),
		skipped: nul(num),
	})

	const Partial_import_response = $yuf_session_oids_response_data(Partial_import_rec)

	type Profile = typeof $yuf_session_oids_user_model_profile_dto.Value
	type Profile_attr = NonNullable<Profile['attributes']>[0]
	type Metadata = typeof $yuf_session_oids_user_model_meta_dto.Value
	type Metadata_attr = Metadata['attributes'][0]
	type Group = NonNullable<typeof $yuf_session_oids_user_model_meta_dto.Value.groups>[9]
	type User_data = typeof $yuf_session_oids_user_model_dto.Value

	function attr_meta_to_internal(attr: Metadata_attr): $yuf_form_attr_type {
		const v = attr.validators
		return {
			type: attr.name?.includes('date') ? 'date' : attr.multivalued ? 'list' : 'string',
			group: attr.group ?? '',
			name: attr.displayName || '',
			hint: attr.annotations?.description || undefined,
			mask: v?.pattern?.pattern || '',
			required: attr.required ?? false,
			enabled: ! attr.readOnly,
			list_min: parse_num(v?.multivalued?.min),
			list_max: parse_num(v?.multivalued?.max),
			length_min: parse_num(v?.length?.min),
			length_max: parse_num(v?.length?.max),
			trim_disabled: v?.length?.['trim-disabled'] === 'true',
		}
	}

	const roles = ['admin', 'user' ]
	const roles_admin = ['admin']

	function attr_internal_to_meta2(name: string, attr: $yuf_form_attr_type): Profile_attr {
		return {
			name,
			group: attr.group || undefined,
			displayName: attr.name,
			multivalued: attr.type === 'list',
			required: ! attr.required ? undefined : { roles },
			permissions: {
				view: roles,
				edit: attr.enabled ? roles : roles_admin,
			},
			annotations: ! attr.hint ? undefined : {
				description: attr.hint
			},
			validations: {
				length: ! attr.length_min && ! attr.length_max ? undefined : {
					min: String(attr.length_min || '1'),
					max: attr.length_max ? String(attr.length_max) : undefined,
					'trim-disabled': attr.trim_disabled ? 'true' : undefined,
				},
				pattern: ! attr.mask ? undefined : {
					pattern: attr.mask,
				}
			}
		}
	}

	function group_meta_to_internal(group: Group): $yuf_form_attr_group_type {
		return {
			name: group.displayHeader ?? '',
			hint: group.displayDescription ?? '',
		}
	}

	function group_internal_to_meta(name: string, group: $yuf_form_attr_group_type): Group {
		return {
			name,
			displayHeader: group.name || undefined,
			displayDescription: group.hint || undefined,
		}
	}

	type Profile_data = {
		attrs: Record<string, $yuf_form_attr_type | null>
		groups: Record<string, $yuf_form_attr_group_type | null>
	}

	function profile_internal_to_meta2(prev: Profile_data, next: Partial<Profile_data>): Profile | null {
		const groups = [] as Group[]
		const prev_groups = prev.groups ?? {}
		const next_groups = next?.groups ?? {}
		let groups_updated = false

		for (let key in prev_groups) {
			if ( next_groups[key] === null ) continue
			groups.push(group_internal_to_meta( key, { ... prev_groups[key], ...next_groups[key] } ))
		}

		for (let key in next_groups) {
			groups_updated = true
			if ( prev_groups[key] || next_groups[key] === null ) continue
			groups.push(group_internal_to_meta(key, next_groups[key]))
		}

		const attributes = [] as Profile_attr[]
		const prev_attrs = prev?.attrs ?? {}
		const next_attrs = next?.attrs ?? {}
		let attrs_updated = groups_updated

		for (let key in prev_attrs) {
			if ( next_attrs[key] === null ) continue
			attributes.push(attr_internal_to_meta2(key, { ... prev_attrs[key], ...next_attrs[key] }))
		}

		for (let key in next_attrs) {
			attrs_updated = true
			if ( prev_attrs[key] || next_attrs[key] === null ) continue
			attributes.push(attr_internal_to_meta2( key, next_attrs[key] ))
		}
		if (! groups_updated && ! attrs_updated) return null

		return { attributes, groups }
	}

	const Ok_response = $yuf_session_oids_response_data($yuf_data_unknown)

	function profile_meta_to_internal(recs: Metadata, prev?: Profile_data) {
		const result = { attrs: {}, groups: {} } as Profile_data
		for (const attr of recs.attributes) {
			const next = attr_meta_to_internal(attr)
			if (prev && $mol_compare_deep(prev.attrs[attr.name], next)) continue
			result.attrs[attr.name] = next
		}
		for (const group of recs.groups ?? []) {
			const next = group_meta_to_internal(group)
			if (prev && $mol_compare_deep(prev.groups?.[group.name], next)) continue
			result.groups[group.name] = next
		}

		return result
	}

	export class $yuf_session_oids_user_store extends $mol_object {
		session() { return this.$.$mol_one.$yuf_session_oids }

		protected static _by_session = new WeakMap<{}, $yuf_session_oids_user_store>()
		static by_session(session: $yuf_session_oids) {
			let store = this._by_session.get(session)
			if (store) return store
			store = this.$.$yuf_session_oids_user_store.make({ $: session.$, session: $mol_const(session) })
			this._by_session.set(session,store)
			return store
		}

		protected is_admin() { return this.session().can_users_view() }
		protected response(url: string, init?: RequestInit) { return this.session().response(url, init) }
		protected endpoint(k: $yuf_session_oids_endpoint, params?: $yuf_session_oids_params) {
			return this.session().endpoint(k, params)
		}

		@ $mol_action
		protected profile_save_body(prev: Profile_data, next: Partial<Profile_data>) {
			const next_data = profile_internal_to_meta2(prev, next)
			return next_data ? JSON.stringify(next_data) : null
		}

		@ $mol_mem
		protected attrs(next?: Partial<Profile_data> ): Profile_data {
			const prev = $mol_wire_probe(() => this.attrs())

			if (next) {
				if (! prev) throw new Error('Load attrs before save')
				const body = this.profile_save_body(prev, next)
				if (body) {
					const save_res = this.response(this.endpoint('profile'), { method: 'PUT', body })
					Ok_response(save_res)
				}
			}

			const recs = this.profile_data(next === undefined ? next : null)
			return profile_meta_to_internal(recs)
		}

		@ $mol_mem
		profile_data(reset?: null) {
			const url = this.is_admin()
				? this.endpoint('metadata')
				: this.endpoint('account', { userProfileMetadata: 'true' })

			const res = this.response(url)
			return Meta_response(res)
		}

		@ $mol_mem_key
		protected attr_group_data(key: string, next?: $yuf_form_attr_group_type | null): $yuf_form_attr_group_type {
			return this.attrs(next === undefined ? next : { groups: { [key]: next } }).groups?.[key] ?? {}
		}

		@ $mol_mem
		attr_group_ids() { return Object.keys(this.attrs().groups ?? {}) }

		@ $mol_mem_key
		attr_group(key: string) {
			return this.$.$yuf_form_attr_group.make({ data: next => this.attr_group_data(key, next) })
		}

		@ $mol_mem
		attr_ids() { return Object.keys(this.attrs().attrs).filter(id => id !== 'username') }

		@ $mol_mem_key
		protected attr_data(key: string, next?: $yuf_form_attr_type | null): $yuf_form_attr_type {
			return this.attrs(next === undefined ? next : { attrs: { [key]: next } }).attrs[key] ?? {}
		}

		@ $mol_mem_key
		attr(key: string) { return this.$.$yuf_form_attr.make({ data: next => this.attr_data(key, next) }) }

		@ $mol_action
		make_empty() { return this.by_id('tmp_' + $mol_guid()) }

		@ $mol_mem
		deleted_ids(next?: readonly string[]): readonly string[] {
			$mol_wire_solid()
			const prev = $mol_wire_probe(() => this.deleted_ids())
			for (const id of next ?? []) this.by_id(id).data(null)

			return [ ...prev ?? [], ...next ?? [] ]
		}

		@ $mol_action
		protected users_chunk({ first, max, enabled, search }: {
			search?: string
			first?: number
			max?: number
			enabled?: boolean
		}) {
			const res = this.response(this.endpoint('users', {
				briefRepresentation: 'true',
				first: String(first || '0'),
				max: String(max || '2000'),
				search,
				enabled: enabled ? 'true' : enabled === false ? 'false' : undefined,
			}))

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

		protected _preloaded = {} as Record<string, User_data | null>
		preloaded(id: string, next?: User_data | null) {
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

		role_names_hided() { return ['uma_authorization', 'offline_access'] }

		@ $mol_mem
		role_names() {
			const result = {} as Record<string, string>
			for (const rec of this.roles_data()) result[rec.id] = rec.name || rec.id
			return result
		}

		@ $mol_mem
		role_hints() {
			const result = {} as Record<string, string>
			for (const rec of this.roles_data()) result[rec.id] = rec.description || ''
			return result
		}

		@ $mol_mem
		protected groups_data() {
			const response = this.response(this.endpoint('groups'))

			return Groups_response(response)
		}

		@ $mol_mem
		group_names() {
			const result = {} as Record<string, string>
			for (const rec of this.groups_data()) result[rec.id] = rec.name || rec.id
			return result
		}

		@ $mol_mem
		group_hints() {
			const result = {} as Record<string, string>
			for (const rec of this.groups_data()) result[rec.id] = rec.name || ''
			return result
		}

		@ $mol_action
		users_data(ids: readonly string[]) {
			this.ids({}) // preload
			const preloaded = this._preloaded
			const ids_not_loaded = ids.filter(id => ! preloaded[id])
			if (ids_not_loaded.length) throw new Error('Not loaded some ids', { cause: { ids_not_loaded } })

			return ids.map(id => preloaded[id]!)
		}

		@ $mol_action
		protected users_create_body(next: readonly User_data[], i = 0, max = this.chunk_max()) {
			const users = next.slice(i, max)
			if (! users.length) return null
			return JSON.stringify({ ifResourceExists: 'SKIP', users })
		}

		@ $mol_action
		protected users_create(next: readonly User_data[]): typeof Partial_import_rec.Value {
			const max = this.chunk_max()
			const users_max = this.users_max()

			const overall = { added: 0, overwritten: 0, skipped: 0 }
			const url = this.endpoint('partialImport')

			for (let i = 0; i < users_max; i += max) {
				const body = this.users_create_body(next, i, max)
				if (! body) break
				const res = this.response(url, { method: 'POST', body })

				const info = Partial_import_response(res)

				overall.added += info.added ?? 0
				overall.overwritten += info.overwritten ?? 0
				overall.skipped += info.skipped ?? 0
			}

			return overall
		}

		@ $mol_action
		protected user_update(next: User_data) {
			const user = this.by_id(next.id)
			const prev = user.data()

			$mol_error_fence(
				() => user.data({ ...prev, ...next }),
				e => new $mol_error_mix('User import error', { user_data: next }, e)
			)

			return user.login()
		}

		@ $mol_action
		protected profile_update(profile_data: Profile_data) {
			this.attrs()
			this.attrs(profile_data)
		}

		@ $mol_action
		import_info(to_import: readonly User_data[]) {
			const profile_prev = this.attrs()
			const ids = this.ids({}) // preload
			const preloaded = this._preloaded

			const to_create = [] as typeof to_import[number][]
			const to_update = [] as typeof to_import[number][]

			const existing_by_name = {} as typeof preloaded
			for (const id of ids) {
				existing_by_name[preloaded[id]?.username ?? ''] = preloaded[id]
			}

			for (const user of to_import) {
				const cur = existing_by_name[user.username ?? '']
				if (! cur) to_create.push(user)
				else to_update.push({ ...cur, ...user, id: cur.id })
			}

			const metadata = to_import.find(user => user.userProfileMetadata)?.userProfileMetadata ?? null
			const profile_data = metadata ? profile_meta_to_internal(metadata, profile_prev) : null

			return { to_create, to_update, profile_data }
		}

		@ $mol_action
		import({ to_create, to_update, profile_data }: ReturnType<typeof this.import_info>) {
			if (profile_data) this.profile_update(profile_data)
			const stat = this.users_create(to_create)

			const created = to_create.map(next => ! next.credentials?.length || ! next.id ? null : this.user_update({
				id: next.id,
				credentials: next.credentials
			})).filter($mol_guard_defined)

			const updated = to_update.map(next => this.user_update(next))

			return { stat, updated, created }
		}
	}

}
