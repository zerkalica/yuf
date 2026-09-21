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

	const unk = (v: unknown) => v


	type Extra_fields = {
		password?: string | null
		password_temporary?: boolean
		password_old?: string | null
		otp?: { secret: string, creds: string }
		webauthn?: { secret: string, creds: string }
		roles?: readonly string[] | null

		locked?: boolean
		login?: string
	}

	export const $yuf_session_oids_user_model_dto = rec({
		id: str,

		username: opt(nul(str)),
		enabled: opt(nul(bool)),

		createdTimestamp: opt(nul(num)),
		firstName: opt(nul(str)),
		lastName: opt(nul(str)),
		attributes: opt(nul(dict(unk))),
		emailVerified: opt(nul(bool)),
		email: opt(nul(str)),
		totp: opt(nul(bool)),
	})

	export type $yuf_session_oids_user_model_data = Omit<typeof $yuf_session_oids_user_model_dto.Value, 'username' | 'enabled'> & Extra_fields

	const Session_dto = rec({
		id: str,
		clients: dict(str),
		start: num,
		lastAccess: num,
		ipAddress: str,
	})

	const Sessions_response = $yuf_session_oids_response_data(arr(Session_dto))

	const Role_dto = rec({
		id: str,
		name: opt(nul(str)),
	})

	const Roles_response = $yuf_session_oids_response_data(arr(Role_dto))

	export const $yuf_session_oids_user_model_response = $yuf_session_oids_response_data($yuf_session_oids_user_model_dto)

	const Ok_response = $yuf_session_oids_response_data($yuf_data_unknown)

	export class $yuf_session_oids_user_model extends $mol_object {

		id() { return '' }

		store() { return this.$.$mol_one.$yuf_session_oids_user_store }
		session() { return this.store().session() }

		protected request(url: string, init?: RequestInit) { return this.session().response_authorized(url, init) }
		protected token(next?: null) { return this.session().token(null) }
		protected is_admin() { return this.session().can_users_view() }
		protected admin_users_url() { return `${this.session().admin_url()}/users` }
		protected admin_user_url() { return `${this.admin_users_url()}/${this.id_actual || this.id()}` }
		protected self_url() { return this.session().endpoint('account') }

		protected preloaded(next?: $yuf_session_oids_user_model_data | null) {
			return this.store().preloaded(this.id(), next)
		}
		protected role_id_name() { return this.store().role_dictionary() }
		protected deleted_ids(next?: readonly string[]) { return this.store().deleted_ids(next) }

		is_self() { return this.store().current().id() === this.id() }

		deleted(next?: boolean) {
			const id = this.id_actual || (this.is_tmp() ? null : this.id())
			if (! id ) return true
			return this.deleted_ids(next ? [ id ] : undefined).includes(id)
		}

		@ $mol_mem
		roles(next?: readonly string[] | null): readonly string[] {
			const url = this.admin_user_url() + '/role-mappings/realm'
			if (this.is_tmp() && ! this.id_actual) return next ?? []

			if (! next) {
				const res = this.request(url)
				const roles = Roles_response(res)

				return roles.map(rec => rec.id)
			}

			const prev = $mol_wire_probe(() => this.roles()) ?? []
			const to_delete = prev.filter(id => ! next.includes(id))
			const to_add = next.filter(id => ! prev.includes(id))
			const headers = { 'Content-Type': 'application/json' }

			const role_id_name = this.role_id_name()
			const map_id = (id: string) => ({ id, name: role_id_name[id] || undefined })

			if (to_delete.length) {
				const res = this.request(url, {
					method: 'DELETE',
					headers,
					body: JSON.stringify(to_delete.map(map_id))
				})
				Ok_response(res)
			}

			if (to_add.length) {
				const res = this.request(url, {
					method: 'POST',
					headers,
					body: JSON.stringify(to_add.map(map_id))
				})
				Ok_response(res)
			}

			return next
		}

		@ $mol_mem
		protected sessions(reset?: null) {
			if (! this.is_admin()) return []
			const res = this.request(`${this.admin_user_url()}/sessions`)

			return Sessions_response(res)
		}

		is_tmp() { return this.id().startsWith('tmp_') }

		id_actual = null as null | string

		deletable() { return ! this.is_self() }

		@ $mol_mem
		data(
			next?: Partial<$yuf_session_oids_user_model_data> | null,
			flush?: 'flush'
		): $yuf_session_oids_user_model_data {
			const id = this.id()
			const prev = $mol_wire_probe(() => this.data()) ?? this.preloaded()

			const is_admin = this.is_admin()
			const url = is_admin ? this.admin_user_url() : this.self_url()

			if (next === undefined) {
				if (! is_admin && prev) return prev
				if (is_admin && prev?.createdTimestamp) return prev

				if (this.is_tmp()) return { id }

				if (! prev || ( is_admin && ! prev.createdTimestamp) ) {
					const res = this.request(url)
					const data = $yuf_session_oids_user_model_response(res)
					return { ...data, locked: data.enabled === false, login: data.username ?? '' }
				}

				return prev
			}

			const headers = { 'Content-Type': 'application/json' }

			if (next === null) {
				if (this.is_self()) throw new Error('Can\'t delete user itself', { cause: { id, url }})
				const res = this.request(url, { method: 'DELETE', headers })
				Ok_response(res)

				return { id }
			}

			if (next.attributes && ( 'email' in next.attributes || 'username' in next.attributes)) {
				throw new Error('Attributes can\'t contain internal values', { cause: { next }})
			}

			const merged = { ... prev, attributes: { ... prev?.attributes } } as $yuf_session_oids_user_model_data

			for (const key of Object.keys(next) as (keyof $yuf_session_oids_user_model_data)[]) {
				if (next[key] === undefined) continue
				if (next[key] === null) delete (merged as Record<string, unknown>)[key]
				else if (key !== 'attributes') (merged as Record<string, unknown>)[key] = next[key]
			}

			const attributes = next.attributes
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
				const credentials = [
					! next.password ? null : {
						type: 'password',
						value: next.password,
						temporary: next.password_temporary ?? false,
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

				const res = this.request(this.admin_users_url(), {
					method: 'POST',
					headers,
					body: JSON.stringify({
						username: merged.login,
						email: merged.email,
						firstName: merged.firstName,
						lastName: merged.lastName,
						enabled: ! merged.locked,
						attributes: merged.attributes,
						credentials,
					}),
				})

				Ok_response(res)
				const user_id = res.headers().get('Location')?.split('/')?.at(-1) ?? null
				if (! user_id) throw new Error('Can\'t create user', { cause: { url, body: next }})
				this.id_actual = user_id

				if (merged.roles?.length) {
					const prev = this.roles(null)
					merged.roles = this.roles([ ... prev, ...merged.roles.filter(id => ! prev.includes(id)) ])
				}

				return merged
			}

			const changed_fields = (Object.keys(merged) as (keyof typeof merged)[])
				.filter(key => ! key.startsWith('password') && key !== 'roles' && ! $mol_compare_deep(prev?.[key as never], merged[key]))

			if (changed_fields.length > 0) {
				const res = this.request(url, {
					method: is_admin ? 'PUT' : 'POST',
					headers,
					body: JSON.stringify({
						id,
						username: merged.login,
						attributes: merged.attributes,
						email: merged.email,
						enabled: is_admin ? ! merged.locked : undefined,
						firstName: merged.firstName,
						lastName: merged.lastName,
					}),
				})

				Ok_response(res)
			}

			if (merged.password) {
				let res
				if (is_admin) {
					res = this.request(this.admin_user_url() + '/reset-password', {
						method: 'PUT',
						headers,
						body: JSON.stringify({
							type: 'password',
							value: merged.password,
							temporary: merged.password_temporary ?? false,
						})
					})
				} else {
					res = this.request(this.self_url() + '/credentials/password', {
						method: 'POST',
						headers,
						body: JSON.stringify({
							currentPassword: merged.password_old,
							newPassword: merged.password,
							confirmation: merged.password,
						})
					})
				}

				Ok_response(res)
			}

			if (merged.roles) merged.roles = this.roles(merged.roles)

			return merged ?? { id }
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

		attrs(next?: Record<string, unknown>) { return this.value('attributes', next) ?? {} }

		@ $mol_mem_key
		protected profile_unknown(key: string, next?: unknown): unknown {
			return this.attrs(next === undefined ? next : { [key]: next })?.[key] ?? null
		}

		profile_str(key: string, next?: string): string {
			const val = this.profile_unknown(key, next) ?? null
			return (Array.isArray(val) ? val?.[0] : val) ?? ''
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

		logout() {
			if (this.is_self()) {
				this.token(null)
				return true
			}

			const res = this.request(this.admin_user_url() + '/logout', { method: 'POST' })
			Ok_response(res)
			this.sessions(null)

			return true
		}

		name(next?: string) { return this.profile_str('name', next) }
		birthday_raw(next?: string) { return this.profile_str('dateOfBirth', next) }
		avatar_url(next?: string) { return this.profile_str('avatar', next) }

		title() { return this.login() + ' ' + this.name() + ' ' + this.email() }

		@ $mol_mem
		is_online(next?: boolean) {
			if (this.is_tmp()) return false
			if (next === false) this.logout()
			const sessions = this.sessions()
			return sessions.length > 0
		}
	}
}
