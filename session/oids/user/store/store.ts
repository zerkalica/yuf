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

	type Preloaded_data = typeof $yuf_session_oids_user_model_dto.Value & { locked?: boolean, login?: string }
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

	const group_dto = rec({

	})

	const meta_dto = rec({
		attributes: opt(nul(arr(attr_dto))),
		groups: opt(nul(arr(group_dto)))
	})

	const Meta_response = $yuf_session_oids_response_data(meta_dto)

	const role_dto = rec({
		id: str,
		name: opt(nul(str)),
		clientRole: opt(nul(bool)),
		composite: opt(nul(bool)),
	})

	const Roles_response = $yuf_session_oids_response_data(arr(role_dto))

	const Users_response = $yuf_session_oids_response_data(arr($yuf_session_oids_user_model_dto))
	const Ok_response = $yuf_session_oids_response_data($yuf_data_unknown)

	const parse_num = (num: string | undefined | null) => typeof num === 'string' ? Number(num) : undefined
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

		protected admin_url() { return this.session().admin_url() }
		protected admin_roles_url() { return this.admin_url() + '/roles' }
		protected admin_users_url() { return this.admin_url() + '/users' }
		protected admin_metadata_url() { return this.admin_users_url() + '/profile/metadata' }
		protected self_url() { return this.session().endpoint('account') }

		@ $mol_mem
		protected attrs() {
			const session = this.session()
			const url = session.can_users_view()
				? this.admin_metadata_url()
				:  this.self_url() + '?' + new URLSearchParams({ userProfileMetadata: 'true' }).toString()

			const res = session.response_authorized(url)

			const result = {} as Record<string, $yuf_form_attr_type>
			const recs = Meta_response(res)
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

		@ $mol_mem_key
		protected data(
			{ first, max, enabled, search }: { search?: string, first?: 0, max?: number, enabled?: boolean },
			reset?: null
		) {
			const q: Record<string, string> = {
				briefRepresentation: 'true',
				first: String(first || '0'),
				max: String(max || '2000'),
			}

			if (search) q.search = search

			if (enabled || enabled === false) q.enabled = enabled ? 'true' : 'false'

			const session = this.session()
			const url = this.admin_users_url() + '?' + new URLSearchParams(q).toString()
			const res = session.response_authorized(url)

			const recs = Users_response(res)

			return recs.map(rec => this.preloaded(rec.id, rec)!)
		}

		@ $mol_mem_key
		protected sorted({ order_by, activity, ...params }: Parameters<typeof this.data>[0] & {
			activity?: 'all' | 'online'
			order_by?: `${'created' | 'modified' | 'login' | 'name' | string}${'' | '_desc'}`
		}, reset?: null) {
			const order_field = order_by?.replace('_desc', '')
			const desc = (order_by ?? undefined) !== (order_field ?? undefined)
			const deleted_ids = this.deleted_ids()

			const is_online = activity === 'online' ? true : null

			return this.data(params, reset)
				.filter(rec => deleted_ids.includes(rec.id)
					? false
					: is_online === null || is_online === this.by_id(rec.id).is_online()
				)
				.toSorted((a, b) => {
					if (desc) {
						let c = a
						a = b
						b = c
					}

					if (order_field === 'login') return a.username?.localeCompare(b.username ?? '') ?? 0
					const aa_raw = a.attributes?.[order_field ?? '']
					const ba_raw = b.attributes?.[order_field ?? '']
					const aa = Array.isArray(aa_raw) ? aa_raw[0] : null
					const ba = Array.isArray(ba_raw) ? ba_raw[0] : null
					if (aa || ba ) return aa?.localeCompare(ba ?? '') ?? 0

					return (a.createdTimestamp ?? 0) - (b.createdTimestamp ?? 0)
				})
		}

		ids(params: Parameters<typeof this.sorted>[0], reset?: null) {
			return this.sorted(params, reset).map(rec => rec.id)
		}

		@ $mol_mem_key
		by_id(id: string) {
			return this.$.$yuf_session_oids_user_model.make({
				id: $mol_const(id),
				store: () => this,
			})
		}

		@ $mol_mem
		current() {
			const response = this.session().response_authorized(this.self_url())
			const data = ! response ? null : $yuf_session_oids_user_model_response(response)
			const id = data?.id ?? ''
			this.preloaded(id, data)

			return this.by_id(id)
		}

		protected _preloaded = {} as Record<string, Preloaded_data | null>
		preloaded(id: string, next?: Preloaded_data | null) {
			if (next === null) delete this._preloaded[id]
			if (next) this._preloaded[id] = next
			return next ?? this._preloaded[id]
		}

		@ $mol_mem_key
		protected roles_search({ search }: { search?: string | null }) {
			const url = this.admin_roles_url()
			const query = ! search ? '' : '?' + new URLSearchParams({ search }).toString()
			const response = this.session().response_authorized(url + query)

			const roles = Roles_response(response)

			const hided = this.role_names_hided()
			return roles.filter(role => ! hided.includes(role.name ?? ''))
		}

		protected roles_data() { return this.roles_search({ search: null}) }

		role_names_hided() {
			return ['uma_authorization', 'offline_access']
		}

		@ $mol_mem
		role_dictionary() {
			return Object.fromEntries(
				this.roles_data().map(rec => [ rec.id, rec.name || rec.id ])
			)
		}

	}

}
