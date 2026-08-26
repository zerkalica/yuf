namespace $.$$ {
	export class $yuf_sj_jammer_task_catalog extends $.$yuf_sj_jammer_task_catalog {
		@ $mol_mem
		override spread_ids_filtered() {
			const drafts = this.store().draft_ids()
			return [ ...drafts, ...super.spread_ids_filtered().filter(id => ! drafts.includes(id)) ]
		}

		override task_add_event(e?: Event) {
			const draft_id = this.store().draft_id()
			this.spread(draft_id)
		}

		override task_submitted( id: string, next?: Event | null ) {
			if (! next) return null
			const created_id = this.store().by_id(id).server_created_id()
			created_id && this.store().id_add(created_id)
			if (this.spread() === id) this.spread('')
			return next
		}

		override spread_title( id: string ) {
			const task = this.task(id)
			return `${task.title()}, ${this.status_text(id)} ${task.comment()}`
		}

		override add_content() {
			return this.sdr().master() ? super.add_content() : []
		}

	}

}
