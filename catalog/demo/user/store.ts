namespace $ {
	export class $yuf_catalog_demo_user_store extends $mol_object {
		@ $mol_mem
		ids_all() {
			const prefix = this.friend_user_id()
			const ids = [] as string[]
			for (let i = 0; i < 20; i++) {
				let id = '' + (i + 1)
				if (prefix) id = prefix + '-' + id
				ids.push(id)
			}

			return ids
		}

		@ $mol_mem
		ids() {
			// search by this.friend_user_id()
			return this.ids_all().filter(id => this.by_id(id).age() >= this.age_from())
		}

		@ $mol_mem
		age_from(next?: number) {
			return next ?? 0
		}

		@ $mol_mem_key
		by_id(id: string) {
			return this.$.$yuf_catalog_demo_user_model.make({
				id: $mol_const(id)
			})
		}

		friend_user_id() {
			return ''
		}
	}
}
