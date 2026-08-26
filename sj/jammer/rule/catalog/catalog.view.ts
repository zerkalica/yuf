namespace $.$$ {
	export class $yuf_sj_jammer_rule_catalog extends $.$yuf_sj_jammer_rule_catalog {
		override menu_title() {
			return this.access_type() === $yuf_sj_jammer_rule_model_status_dto.config.dict.allow
				? super.menu_title()
				: this.menu_title_blacklist()
		}

		override menu_filter_hint() {
			return super.menu_filter_hint().replace('{type}', this.menu_title())
		}

		@ $mol_mem
		override spread_ids_filtered() {
			const ids = this.store().draft_ids()
			return [ ...ids, ...super.spread_ids_filtered().filter( id => ! ids.includes(id)) ]
		}


		override spread_title(id: string) {
			const rule = this.rule(id)
			return rule.title()
		}

		override rule(id: string) { return this.store().by_id(id) }

		override remove_event(id: string, e?: Event) {
			const store = this.store()
			store.by_id(id).remove()
			store.id_remove(id)
			this.spread('')
		}

		override done(id: string, next?: boolean) {
			if (! next) return false
			const store = this.store()
			store.by_id(id).server_created_id()
			store.id_add(id)
			this.spread('')

			return false
		}

		override add_content() {
			return this.master() ? super.add_content() : []
		}

		override remove_content() {
			return this.master() ? super.remove_content() : []
		}

		override add_event( next?: Event ) {
			const access = this.access_type()
			const id = this.store().draft_id()
			const draft = this.store().by_id(id)
			draft.draft({ access })
			this.spread(id)
		}

		override remove_all_event(e?: Event) {
			this.spread('')
			this.store().remove()
		}

	}
}
