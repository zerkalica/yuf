namespace $.$$ {
	export class $yuf_sj_ui_book_list extends $.$yuf_sj_ui_book_list {

		@ $mol_mem
		override rows() { return this.ids().map(id => this.Row(id)) }

		@ $mol_mem
		override draft_id(next?: string) {
			this.ids()
			return next ?? $mol_guid()
		}

		@ $mol_mem
		override draft_content() {
			if (this.ids().length >= this.max_rows()) return []
			return [ this.Row_draft(this.draft_id()) ]
		}
	}

}
