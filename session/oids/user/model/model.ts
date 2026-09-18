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

	export const $yuf_session_oids_user_model_dto = rec({
		id: str,
		createdTimestamp: opt(nul(num)),
		username: opt(nul(str)),
		firstName: opt(nul(str)),
		lastName: opt(nul(str)),
		enabled: opt(nul(bool)),
		attributes: opt(nul(dict(unk))),
		emailVerified: opt(nul(bool)),
		email: opt(nul(str)),
		totp: opt(nul(bool)),
	})

	const Session_dto = rec({
		id: str,
		clients: dict(str),
		start: num,
		lastAccess: num,
		ipAddress: str,
	})

	const Sessions_response = $yuf_session_oids_response_data(arr(Session_dto))

	export const $yuf_session_oids_user_model_response = $yuf_session_oids_response_data($yuf_session_oids_user_model_dto)

	const Ok_response = $yuf_session_oids_response_data($yuf_data_unknown)

	export class $yuf_session_oids_user_model extends $mol_object {

		id() { return '' }

		preloaded(reset?: typeof $yuf_session_oids_user_model_dto.Value | null) {
			return null as null | typeof $yuf_session_oids_user_model_dto.Value
		}

		session() { return this.$.$mol_one.$yuf_session_oids }
		protected request(url: string, init?: RequestInit) { return this.session().response_authorized(url, init) }

		protected admin_user_url() { return `${this.session().admin_url()}/users/${this.id()}` }
		protected self_url() { return this.session().endpoint('account') }

		protected is_self() { return this.session().user_id() === this.id() }

		@ $mol_mem
		protected sessions(reset?: null) {
			const res = this.request(`${this.admin_user_url()}/sessions`)

			return Sessions_response(res)
		}

		protected is_tmp() { return this.id().startsWith('tmp_') }

		id_actual = null as null | string

		@ $mol_mem
		data(next?: Partial<typeof $yuf_session_oids_user_model_dto.Value> | null, flush?: 'flush'): typeof $yuf_session_oids_user_model_dto.Value {
			const id = this.id()
			const prev = $mol_wire_probe(() => this.data()) ?? this.preloaded()

			const pushed = next
				? {
					... prev,
					...next,
					attributes: { ...prev?.attributes, ...next.attributes }
				} as typeof $yuf_session_oids_user_model_dto.Value
				: next


			if (next === undefined && prev) return prev

			if (this.is_tmp() && ! flush) return pushed ?? prev ?? { id }

			const is_self = this.is_self()

			const url = is_self ? this.self_url() : this.admin_user_url()

			if (pushed === undefined) {
				const res = this.request(url)
				return $yuf_session_oids_user_model_response(res)
			}

			if (pushed?.id) this.id_actual = pushed.id

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

			if (is_self && pushed === null) throw new Error('Can\'t delete user itself', { cause: {
				id,
				url,
			}})

			const res = this.request(url, {
				method: pushed === null ? 'DELETE' : is_self ? 'POST' : 'PUT',
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

			Ok_response(res)

			return pushed ?? { id }
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
			if (raw) Object.keys(raw).forEach(key => {
				result[key] = (Array.isArray(raw[key]) ? raw[key][0] : null) ?? null
			} )

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
			if (this.is_self()) {
				this.session().token(null)
				return true
			}

			const res = this.request(this.admin_user_url() + '/logout', { method: 'POST' })
			Ok_response(res)
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
