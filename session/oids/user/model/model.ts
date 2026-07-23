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

	const User_dto = rec({
		id: str,
		createdTimestamp: opt(nul(num)),
		username: opt(nul(str)),
		enabled: opt(nul(bool)),
		attributes: opt(nul(dict(arr(str)))),
		emailVerified: opt(nul(bool)),
		email: opt(nul(str)),
	})

	const Users_response = $yuf_session_oids_response_data(arr(User_dto))

	const Session_dto = rec({
		id: str,
		clients: dict(str),
		start: num,
		lastAccess: num,
		ipAddress: str,
	})

	const Sessions_response = $yuf_session_oids_response_data(arr(Session_dto))

	const User_response = $yuf_session_oids_response_data(User_dto)

	export class $yuf_session_oids_user_model extends $mol_object {
		protected static session() { return this.$.$mol_one.$yuf_session_oids }
		protected static request(url: string, init?: RequestInit) { return this.session().response_authorized(url, init) }
		protected static admin_url() { return this.session().realm_url('/admin') }
		protected static users_url() { return this.admin_url() + '/users' }

		protected static current = {} as Record<string, typeof User_dto.Value>

		@ $mol_mem_key
		protected static data({ first, max, search, enabled }: { search: string, first?: 0, max?: 1000, enabled?: boolean }) {
			const q: Record<string, string> = {
				briefRepresentation: 'true',
				first: String(first || '0'),
				max: String(max || '1000'),
				search,
			}

			if (enabled || enabled === false) q.enabled = enabled ? 'true' : 'false'

			const url = this.users_url() + '?' + new URLSearchParams(q).toString()

			const res = this.request(url)

			const recs = Users_response(res)
			recs.forEach(rec => { this.current[rec.id] = rec })

			return recs
		}

		@ $mol_mem_key
		static sorted({ order_by, ...params }: Parameters<typeof this.data>[0] & { order_by?: `${'created' | 'modified' | 'login' | 'name'}${'' | '_desc'}`}) {
			const desc = order_by?.endsWith('_desc')

			return this.data(params).toSorted((a, b) => {
				if (desc) {
					let c = a
					a = b
					b = c
				}

				if (order_by === 'login') return a.username?.localeCompare(b.username ?? '') ?? 0
				if (order_by === 'name') return a.attributes?.name?.[0]?.localeCompare(b.attributes?.name?.[0] ?? '') ?? 0

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
				preloaded: (reset?: null) => this.current[id]
			})
		}

		id() { return '' }

		preloaded(reset?: null) {
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

		@ $mol_mem
		data(next?: null) {
			const res = this.request(this.user_url())
			return User_response(res)
		}

		@ $mol_mem_key
		protected value<
			Field extends keyof ReturnType< typeof this.data >
		>(
			field: Field,
			next?: null,
		) {
			return this.preloaded(next)?.[field] ?? this.data(next)?.[ field ] ?? null
		}

		protected attr(key: string) { return this.value('attributes')?.[key]?.[0] ?? null }

		login() { return this.value('username') ?? '' }
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

		title() { return this.login() }

		@ $mol_mem
		is_online() {
			return this.sessions().length > 0
		}
	}
}
