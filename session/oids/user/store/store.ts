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

	const Users_response = $yuf_session_oids_response_data(arr($yuf_session_oids_user_model_dto))
	const Ok_response = $yuf_session_oids_response_data($yuf_data_unknown)

	const parse_num = (num: string | undefined | null) => typeof num === 'string' ? Number(num) : undefined
	function attr_normalize(attr: typeof attr_dto.Value): $yuf_form_attr_type {
		return {
			type: 'string',
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

		protected user_data_preloaded = {} as Record<string, typeof $yuf_session_oids_user_model_dto.Value | null>

		protected admin_users_url() { return this.session().admin_url() + '/users' }
		protected admin_metadata_url() { return this.admin_users_url() + '/profile/metadata' }
		protected self_url() { return this.session().endpoint('account') }

		@ $mol_mem
		protected profile_metadata() {
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
		metadata_ids() { return Object.keys(this.profile_metadata()) }

		@ $mol_mem_key
		attr(key: string) {
			return this.$.$yuf_form_attr.make({ data: () => this.profile_metadata()[key] ?? {} })
		}

		create_user(next: {
			username: string
			email: string
			enabled: boolean

			firstName?: string
			lastName?: string
			attributes?: Record<string, string | readonly string[]>

			password?: {
				value: string
				temporary?: boolean
			}

			otp?: { secret: string, creds: string }
			webauthn?: { secret: string, creds: string }
		}) {
			const url = this.admin_users_url()

			const attributes = ! next.attributes ? undefined
				: Object.fromEntries(Object.entries(next.attributes).map(([k, v]) => [k, Array.isArray(v) ? v : [ v ?? '' ]]))

			const credentials = [
				! next.password ? null : {
					type: 'password',
					value: next.password.value,
					temporary: next.password.temporary ?? false,
				},
				! next.otp ? null : {
					type: 'otp',
					secretData: next.otp.secret,
					credentialData: next.otp.creds,
				},

				! next.webauthn ? null : {
					type: 'webauthn',
					secretData: next.webauthn.secret,
					credentialData: next.webauthn.creds,
				}
			].filter(Boolean)

			if (! credentials.length) throw new Error('Require credentials for creating user', { cause: { body: next }})

			const res = this.session().response_authorized(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...next,
					password: undefined,
					otp: undefined,
					webauthn: undefined,
					attributes,
					credentials,
				})
			})

			Ok_response(res)

			const user_id = res.headers().get('Location')?.split('/')?.at(-1) ?? null

			if (! user_id) throw new Error('Can\'t create user', { cause: {
				url,
				body: next,
			}})

			return user_id
		}

		@ $mol_mem_key
		protected data({ first, max, enabled, search }: { search?: string, first?: 0, max?: 1000, enabled?: boolean }) {
			const q: Record<string, string> = {
				briefRepresentation: 'true',
				first: String(first || '0'),
				max: String(max || '1000'),
			}

			if (search) q.search = search

			if (enabled || enabled === false) q.enabled = enabled ? 'true' : 'false'

			const session = this.session()
			const url = this.admin_users_url() + '?' + new URLSearchParams(q).toString()
			const res = session.response_authorized(url)

			const recs = Users_response(res)
			recs.forEach(rec => this.preloaded(rec.id, rec))

			return recs
		}

		@ $mol_mem_key
		protected sorted({ order_by, is_online, ...params }: Parameters<typeof this.data>[0] & {
			is_online?: boolean
			order_by?: `${'created' | 'modified' | 'login' | 'name'}${'' | '_desc'}`
		}) {
			const order_field = order_by?.replace('_desc', '')
			const desc = (order_by ?? undefined) !== (order_field ?? undefined)

			return this.data(params)
				.filter(rec => is_online === undefined || is_online === null ? true : is_online === this.by_id(rec.id).is_online())
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

		ids(params: Parameters<typeof this.sorted>[0]) {
			return this.sorted(params).map(rec => rec.id)
		}

		@ $mol_mem_key
		by_id(id: string) {
			return this.$.$yuf_session_oids_user_model.make({
				id: $mol_const(id),
				session: () => this.session(),
				preloaded: next => this.preloaded(id, next)
			})
		}

		@ $mol_mem
		current() {
			const response = this.session().response_authorized(this.self_url())
			const data = ! response ? null : $yuf_session_oids_user_model_response(response)
			const id = data?.id ?? ''
			this.preloaded(id, data ?? { id })
			return this.by_id(id)
		}

		protected preloaded(id: string, next?: typeof $yuf_session_oids_user_model_dto.Value | null) {
			if (next !== undefined) this.user_data_preloaded[id] = next
			return this.user_data_preloaded[id]
		}

	}
}
