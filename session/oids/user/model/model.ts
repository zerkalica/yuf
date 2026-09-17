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

	const User_dto = rec({
		id: str,
		createdTimestamp: opt(nul(num)),
		username: opt(nul(str)),
		firstName: opt(nul(str)),
		lastName: opt(nul(str)),
		enabled: opt(nul(bool)),
		attributes: opt(nul(dict(opt(nul(arr(str)))))),
		emailVerified: opt(nul(bool)),
		email: opt(nul(str)),
		userProfileMetadata: opt(nul(meta_dto)),
	})

	const Users_response = $yuf_session_oids_response_data(arr(User_dto))

	const Session_dto = rec({
		id: str,
		clients: dict(str),
		start: num,
		lastAccess: num,
		ipAddress: str,
	})

	type Mutable<T> = {
		-readonly [K in keyof T]: T[K];
	}

	const Sessions_response = $yuf_session_oids_response_data(arr(Session_dto))

	const User_response = $yuf_session_oids_response_data(User_dto)

	const User_put_response = $yuf_session_oids_response_data($yuf_data_unknown)

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

	export class $yuf_session_oids_user_model extends $mol_object {
		protected static session() { return this.$.$mol_one.$yuf_session_oids }
		protected static request(url: string, init?: RequestInit) { return this.session().response_authorized(url, init) }
		protected static admin_url() { return this.session().realm_url('/admin') }
		protected static users_url() { return this.admin_url() + '/users' }
		protected static meta_url() { return this.admin_url() + '/users/profile/metadata' }

		protected static user_data_preloaded = {} as Record<string, typeof User_dto.Value | null>
		private static attrs_preloaded = {} as Record<string, $yuf_form_attr_type>

		@ $mol_mem
		protected static attrs() {
			const res = this.request(this.meta_url())
			const result = {} as Record<string, $yuf_form_attr_type>
			const recs = Meta_response(res)
			for (const attr of recs?.attributes ?? []) {
				if (! attr.name) continue
				result[attr.name] = attr_normalize(attr)
			}

			return result
		}

		@ $mol_mem
		static attr_tags() { return Object.keys(this.attrs()) }

		attr_meta(key: string) { return this.factory().attr(key) }

		@ $mol_mem_key
		static attr(key: string) {
			return this.$.$yuf_form_attr.make({ data: () => this.attrs()[key] ?? {} })
		}

		@ $mol_mem_key
		protected static data({ first, max, enabled, search }: { search?: string, first?: 0, max?: 1000, enabled?: boolean }) {
			const q: Record<string, string> = {
				briefRepresentation: 'true',
				first: String(first || '0'),
				max: String(max || '1000'),
			}

			if (search) q.search = search

			if (enabled || enabled === false) q.enabled = enabled ? 'true' : 'false'

			const url = this.users_url() + '?' + new URLSearchParams(q).toString()

			const res = this.request(url)

			const recs = Users_response(res)

			for (const rec of recs) {
				for (const attr of rec.userProfileMetadata?.attributes ?? []) {
					if (! attr.name) continue
					this.attrs_preloaded[attr.name] = attr_normalize(attr)
				}

				delete (rec as Mutable<typeof rec>).userProfileMetadata

				this.user_data_preloaded[rec.id] = rec
			}

			return recs
		}

		@ $mol_mem_key
		static sorted({ order_by, is_online, ...params }: Parameters<typeof this.data>[0] & {
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
					const aa = a.attributes?.[order_field ?? '']?.[0]
					const ba = b.attributes?.[order_field ?? '']?.[0]
					if (aa || ba ) return aa?.localeCompare(ba ?? '') ?? 0

					return (a.createdTimestamp ?? 0) - (b.createdTimestamp ?? 0)
				})
		}

		static ids(params: Parameters<typeof this.sorted>[0]) {
			return this.sorted(params).map(rec => rec.id)
		}

		@ $mol_mem_key
		static by_id(id: string) {
			return this.$.$yuf_session_oids_user_model.make({
				id: $mol_const(id),
				preloaded: next => this.current_val(id, next)
			})
		}

		protected static current_val(id: string, next?: typeof User_dto.Value | null) {
			if (next !== undefined && this.user_data_preloaded[id]) this.user_data_preloaded[id] = next
			return this.user_data_preloaded[id]
		}

		id() { return '' }

		preloaded(reset?: typeof User_dto.Value | null) {
			return null as null | typeof User_dto.Value
		}

		protected factory() { return this.$.$mol_static.$yuf_session_oids_user_model }
		protected request(url: string, init?: RequestInit) { return this.factory().request(url, init) }
		protected user_url() { return `${this.factory().users_url()}/${this.id()}` }

		@ $mol_mem
		protected sessions(reset?: null) {
			const res = this.request(`${this.user_url()}/sessions`)

			return Sessions_response(res)
		}

		protected is_tmp() { return this.id().startsWith('tmp_') }

		@ $mol_mem
		data(next?: Partial<typeof User_dto.Value> | null, flush?: 'flush'): typeof User_dto.Value {
			const id = this.id()
			const prev = $mol_wire_probe(() => this.data()) ?? this.preloaded()

			const pushed = next
				? {
					... prev,
					...next,
					attributes: { ...prev?.attributes, ...next.attributes }
				} as typeof User_dto.Value
				: next


			if (next === undefined && prev) return prev

			if (this.is_tmp() && ! flush) return pushed ?? prev ?? { id }

			const url = this.user_url()

			if (pushed === undefined) {
				const res = this.request(url)
				return User_response(res)
			}

			// if (this.is_tmp() && pushed) {
			// 	this.factory().create_user({
			// 		username : pushed.username ?? '',
			// 		email: pushed.email ?? '',
			// 		enabled: pushed.enabled ?? true,
			// 		password: {
			// 			value: pushed.password,
			// 			temporary: false,
			// 		},
			// 	})
			// }

			const res = this.request(url, {
				method: pushed === null ? 'DELETE' : 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: pushed === null ? undefined : JSON.stringify({
					...pushed,
					userProfileMetadata: undefined,
					createdTimestamp: undefined,
					totp: undefined,
					disableableCredentialTypes: undefined,
					access: undefined,
					federatedIdentities: undefined,
					self: undefined,
				}),
			})

			User_put_response(res)

			return pushed ?? { id }
		}

		static create_user(next: {
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
			const url = this.users_url()

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

			const res = this.request(url, {
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

			User_put_response(res)

			const user_id = res.headers().get('Location')?.split('/')?.at(-1) ?? null

			if (! user_id) throw new Error('Can\'t create user', { cause: {
				url,
				body: next,
			}})

			return user_id
		}

		@ $mol_mem_key
		protected value<
			Field extends keyof ReturnType< typeof this.data >
		>(
			field: Field,
			next?: ReturnType< typeof this.data >[Field],
		) {
			return this.data(next ? { [field]: next } : next === null ? null : undefined)?.[ field ] ?? null
		}

		@ $mol_mem
		attrs(next?: Record<string, string | null>) {
			let next_raw = next ? {} as Record<string, readonly string[] | undefined> : undefined

			if (next && next_raw) {
				Object.keys(next ?? {}).forEach(key => {
					next_raw[key] = next[key] === undefined || next[key] === null ? undefined : [ next[key] ]
				} )
			}

			const raw = this.value('attributes', next_raw)

			const result = {} as Record<string, string | null>
			if (raw) Object.keys(raw).forEach(key => { result[key] = raw[key]?.[0] ?? null } )

			return result
		}

		@ $mol_mem_key
		attr(key: string, next?: string) {
			return this.attrs(next === undefined ? next : { [key]: next })?.[key] ?? null
		}

		login() { return this.value('username') ?? '' }
		first_name() { return this.value('firstName') ?? '' }
		last_name() { return this.value('lastName') ?? '' }

		email() { return this.value('email') ?? '' }

		verified() { return this.value('emailVerified') ?? false }
		enabled() { return this.value('enabled') ?? false }

		@ $mol_mem
		created_at() { return new $mol_time_moment(this.value('createdTimestamp') ?? 0) }

		logged_at() {
			return null as null | $mol_time_moment
		}

		logout() {
			this.request(this.user_url() + '/logout', { method: 'POST' })
			this.sessions(null)
			return true
		}

		name() { return this.attr('name') ?? '' }
		birthday_raw() { return this.attr('dateOfBirth') ?? '' }

		title() { return this.login() + ' ' + this.name() + ' ' + this.email() }

		@ $mol_mem
		is_online() {
			const sessions = this.sessions()
			return sessions.length > 0
		}
	}
}
