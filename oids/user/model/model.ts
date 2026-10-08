namespace $ {
	const rec = $mol_data_record
	const str = $mol_data_string
	const num = $mol_data_number
	const bool = $mol_data_boolean
	const arr = $mol_data_array
	const dict = $mol_data_dict
	const vr = $mol_data_variant
	const cnst = $mol_data_const

	const nul = $yuf_data_nul
	const unk = $yuf_data_unknown

	const Credential_password_rec = rec({
		type: cnst('password' as const),
		value: str,
		temporary: nul(bool),
	})
	const Credential_otp_rec = rec({
		type: cnst('otp' as const),
		secretData: str,
		credentialData: str,
	})
	const Credential_webauthn_rec = rec({
		type: cnst('webauthn' as const),
		secretData: str,
		credentialData: str,
	})

	const Credentials_rec = arr(vr(Credential_password_rec, Credential_otp_rec, Credential_webauthn_rec))

	type Extra_fields = {
		password?: string | null
		password_temporary?: boolean | null
		password_old?: string | null
		otp?: { secret: string, creds: string }
		webauthn?: { secret: string, creds: string }
		roles?: readonly string[] | null

		locked?: boolean
		login?: string
	}

	export function $yuf_oids_user_model_credentials(next: Extra_fields): typeof Credentials_rec.Value {
		return [
			! next.password ? null : {
				type: 'password' as const,
				value: next.password,
				temporary: next.password_temporary ?? false,
			},
			! next.otp ? null : {
				type: 'otp' as const,
				secretData: next.otp.secret,
				credentialData: next.otp.creds,
			},

			! next.webauthn ? null : {
				type: 'webauthn' as const,
				secretData: next.webauthn.secret,
				credentialData: next.webauthn.creds,
			}
		].filter($mol_guard_defined)
	}

	const Validators_rec = rec({
		multivalued: nul(rec({
			min: nul(str),
			max: nul(str),
		})),
		pattern: nul(rec({
			pattern: nul(str),
			'ignore.empty.value': nul(bool),
		})),
		length: nul(rec({
			min: nul(str),
			max: nul(str),
			'trim-disabled': nul(str),
		})),
	})

	const Annoations_rec = rec({
		description: nul(str),
	})

	const Meta_base_rec = rec({
		name: str,
		displayName: nul(str),
		multivalued: nul(bool),
		group: nul(str),
		annotations: nul(Annoations_rec),
	})

	const Attr_group_rec = rec({
		name: str,
		displayDescription: nul(str),
		displayHeader: nul(str),
		annotations: nul(dict(unk)),
	})

	const Meta_attr_rec = rec({
		...Meta_base_rec.config,
		validators: nul(Validators_rec),
		required: nul(bool),
		readOnly: nul(bool),
	})

	export const $yuf_oids_user_model_meta_dto = rec({
		attributes: arr(Meta_attr_rec),
		groups: nul(arr(Attr_group_rec))
	})

	const Profile_attr_rec = rec({
		...Meta_base_rec.config,
		validations: nul(Validators_rec),
		required: nul(rec({
			roles: nul(arr(str)),
			scopes: nul(arr(str)),
		})),
		permissions: nul(rec({
			view: nul(arr(str)),
			edit: nul(arr(str)),
		})),
		selector: nul(rec({
			scopes: nul(arr(str)),
		})),
	})

	export const $yuf_oids_user_model_profile_dto = rec({
		attributes: nul(arr(Profile_attr_rec)),
		groups: nul(arr(Attr_group_rec))
	})

	export const $yuf_oids_user_model_dto = rec({
		id: str,

		username: nul(str),
		enabled: nul(bool),

		createdTimestamp: nul(num),
		firstName: nul(str),
		lastName: nul(str),
		attributes: nul(dict(arr(str))),
		emailVerified: nul(bool),
		email: nul(str),
		totp: nul(bool),
		credentials: nul(Credentials_rec),

		userProfileMetadata: nul($yuf_oids_user_model_meta_dto),
		// access: nul(dict(bool)),
		// disableableCredentialTypes: nul(arr(unk)),
		// requiredActions: nul(arr(unk)),
		// notBefore: nul(num),
	})

	export type $yuf_oids_user_model_data = typeof $yuf_oids_user_model_dto.Value & Extra_fields

	const Session_rec = rec({
		id: str,
		clients: dict(str),
		start: num,
		lastAccess: num,
		ipAddress: str,
	})

	const Sessions_response = $yuf_oids_response_data(arr(Session_rec))

	const Role_rec = rec({
		id: str,
		name: nul(str),
	})

	const Roles_response = $yuf_oids_response_data(arr(Role_rec))

	export const $yuf_oids_user_model_response = $yuf_oids_response_data($yuf_oids_user_model_dto)

	const Info_rec = rec({

	})

	const Info_response = $yuf_oids_response_data(Info_rec)

	const Ok_response = $yuf_oids_response_data($yuf_data_unknown)

	export class $yuf_oids_user_model extends $mol_object {

		id() { return '' }


		store() { return this.$.$mol_one.$yuf_oids_user_store }
		session() { return this.store().session() }

		protected response(url: string, init?: RequestInit) { return this.session().response(url, init) }
		protected post(url: string, body?: {}, method ='POST') {
			const res = this.response(url, {
				method,
				body: ! body ? undefined : JSON.stringify(body),
			})
			Ok_response(res)
			return res
		}

		protected attributes_decode(attributes: Record<string, readonly string[]> | undefined | null) { return attributes }
		protected attributes_encode(attributes: Record<string, readonly string[]> | undefined | null) { return attributes }

		protected put(url: string, body?: {}) { return this.post(url, body, 'PUT') }
		protected delete_req(url: string, body?: {}) { return this.post(url, body, 'DELETE') }

		protected token(next?: null) { return this.session().token(null) }
		protected is_admin() { return this.session().can_users_view() }
		protected endpoint(k: $yuf_oids_endpoint, params?: $yuf_oids_params) {
			return this.session().endpoint(k, params)
		}
		protected admin_user_url() { return `${this.endpoint('users')}/${this.id_actual || this.id()}` }
		protected account_url() { return this.session().endpoint('account') }
		protected info_url() { return this.session().endpoint('userinfo') }

		protected preloaded(next?: null) { return this.store().preloaded(this.id(), next) }

		protected role_id_name() { return this.store().role_names() }
		protected deleted_ids(next?: readonly string[]) { return this.store().deleted_ids(next) }

		is_self() { return this.session().user_id() === this.id() }

		deleted(next?: boolean) {
			const id = this.id_actual || (this.is_tmp() ? null : this.id())
			if (! id ) return true
			return this.deleted_ids(next ? [ id ] : undefined).includes(id)
		}

		groups() { return [] }

		@ $mol_mem
		roles(next?: readonly string[] | null): readonly string[] {
			const url = this.admin_user_url() + '/role-mappings/realm'
			if (this.is_tmp() && ! this.id_actual) return next ?? []

			if (! next) {
				const res = this.response(url)
				const roles = Roles_response(res)

				return roles.map(rec => rec.id)
			}

			const prev = $mol_wire_probe(() => this.roles()) ?? []
			const to_delete = prev.filter(id => ! next.includes(id))
			const to_add = next.filter(id => ! prev.includes(id))

			const role_id_name = this.role_id_name()
			const map_id = (id: string) => ({ id, name: role_id_name[id] || undefined })

			if (to_delete.length) this.delete_req(url, to_delete.map(map_id))
			if (to_add.length) this.post(url, to_add.map(map_id))

			return next
		}

		protected sessions_url() { return `${this.admin_user_url()}/sessions` }

		@ $mol_mem
		protected sessions(next?: null | Record<string, null>) {
			if (next === null && this.is_self()) {
				this.token(null)
				return []
			}

			if (! this.is_admin()) return []
			const url = this.sessions_url()

			if (next === null) this.post(this.admin_user_url() + '/logout')
			else if (next) Object.keys(next).map(id => this.delete_req(url + '/' + id))

			const res = this.response(url)

			return Sessions_response(res)
		}

		is_tmp() { return this.id().startsWith('tmp_') }

		id_actual = null as null | string

		is_removable() { return ! this.is_self() }

		@ $mol_mem
		data(
			next?: Partial<$yuf_oids_user_model_data> | null,
			flush?: 'flush'
		): $yuf_oids_user_model_data {
			const id = this.id()
			let prev = $mol_wire_probe(() => this.data())

			const is_admin = this.is_admin()
			const url = is_admin ? this.admin_user_url() : this.account_url()

			if (next === undefined) {
				if (flush || ! prev ) {
					prev = this.is_tmp() ? { id } : (this.preloaded() ?? $yuf_oids_user_model_response(this.response(url)))
				}
				// const info = Info_response(this.request(this.info_url()))
				const attributes = this.attributes_decode(prev.attributes) ?? undefined

				return {
					...prev,
					attributes,
					username: undefined,
					enabled: undefined,
					locked: prev.locked ?? prev.enabled === false,
					login: prev.login ?? prev.username ?? '',
				}
			}

			if (next === null) {
				if (this.is_self()) throw new Error('Can\'t delete user itself', { cause: { id, url }})
				this.delete_req(url)
				return { id }
			}

			if (next.attributes && ( 'email' in next.attributes || 'username' in next.attributes)) {
				throw new Error('Attributes can\'t contain internal values', { cause: { next }})
			}

			const merged = { ... prev, attributes: { ... prev?.attributes } } as $yuf_oids_user_model_data

			for (const key of Object.keys(next) as (keyof $yuf_oids_user_model_data)[]) {
				if (next[key] === undefined) continue
				if (next[key] === null) delete (merged as Record<string, unknown>)[key]
				else if (key !== 'attributes') (merged as Record<string, unknown>)[key] = next[key]
			}

			const attributes = this.attributes_decode(next.attributes)
			if (attributes) {
				for (const key of Object.keys(attributes)) {
					if (attributes[key] === undefined) continue
					if (attributes[key] === null) delete (merged.attributes as Record<string, unknown>)[key]
					else (merged.attributes as Record<string, unknown>)[key] = Array.isArray(attributes[key])
						? attributes[key]
						: [ attributes[key] ]
				}
			}

			if (this.is_tmp() && ! flush) return merged

			if (this.is_tmp()) {
				const credentials = next.credentials ?? $yuf_oids_user_model_credentials(next)
				if (! credentials.length) throw new Error('Require credentials for creating user', { cause: next })

				const res = this.post(this.endpoint('users'), {
					username: merged.login,
					email: merged.email,
					firstName: merged.firstName,
					lastName: merged.lastName,
					enabled: ! merged.locked,
					attributes: this.attributes_encode(merged.attributes),
					credentials,
				})

				const user_id = res.headers().get('Location')?.split('/')?.at(-1) ?? null
				if (! user_id) throw new Error('Can\'t create user', { cause: res })
				this.id_actual = user_id

				if (merged.roles?.length) {
					const prev = this.roles(null)
					merged.roles = this.roles([ ... prev, ...merged.roles.filter(id => ! prev.includes(id)) ])
				}

				return merged
			}

			const changed_fields = (Object.keys(merged) as (keyof typeof merged)[])
				.filter(key => ! key.startsWith('password') && key !== 'roles' && ! $mol_compare_deep(prev?.[key as never], merged[key]))

			if (changed_fields.length > 0) this.post(url, {
					id,
					username: merged.login,
					attributes: this.attributes_encode(merged.attributes),
					email: merged.email,
					enabled: is_admin ? ! merged.locked : undefined,
					firstName: merged.firstName,
					lastName: merged.lastName,
				},
				is_admin ? 'PUT' : 'POST'
			)

			if (merged.password && is_admin) this.put(this.admin_user_url() + '/reset-password', {
				type: 'password',
				value: merged.password,
				temporary: merged.password_temporary ?? false,
			})

			if (merged.password && ! is_admin) this.post(this.account_url() + '/credentials/password', {
				currentPassword: merged.password_old,
				newPassword: merged.password,
				confirmation: merged.password,
			})

			if (merged.roles) merged.roles = this.roles(merged.roles)

			return { ...merged, password: undefined, password_old: undefined, password_temporary: undefined, credentials: undefined }
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

		protected attrs(next?: Record<string, readonly string[]>) { return this.value('attributes', next) ?? {} }

		@ $mol_mem_key
		profile_list(key: string, next?: readonly string[]) {
			return this.attrs(next === undefined ? next : { [key]: next })?.[key] ?? []
		}

		profile_str(key: string, next?: string) {
			return this.profile_list(key, next === undefined ? next : next === null ? [] : [ next ] )?.[0] ?? ''
		}

		login() { return this.value('login') ?? '' }
		first_name() { return this.value('firstName') ?? '' }
		last_name() { return this.value('lastName') ?? '' }

		email() { return this.value('email') ?? '' }

		verified() { return this.value('emailVerified') ?? false }
		locked() { return this.value('locked') ?? false }

		created_at_raw() { return this.value('createdTimestamp') ?? 0 }

		@ $mol_mem
		created_at() {
			const raw = this.created_at_raw()
			return new $mol_time_moment(raw)
		}

		logged_at() {
			return null as null | $mol_time_moment
		}

		@ $mol_action
		logout(next?: null | Record<string, null>) {
			this.sessions(next ?? null)
			return true
		}

		name(next?: string) { return this.profile_str('name', next) }

		title() { return this.login() + ' ' + this.name() }

		session_ids() { return this.sessions().map(rec => rec.id) }

		@ $mol_mem_key
		protected session_data_by_id(id: string) { return this.sessions().find(rec => rec.id === id) }

		@ $mol_mem
		is_online(next?: boolean) {
			if (this.is_tmp()) return false
			if (next === false) this.logout()
			const sessions = this.sessions()
			return sessions.length > 0
		}
	}
}
