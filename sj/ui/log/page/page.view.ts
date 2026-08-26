namespace $.$$ {
	export class $yuf_sj_ui_log_page extends $.$yuf_sj_ui_log_page {
		
		override log_row(index: number) {
			return this.model().line(index)
		}

		override rows() {
			return this.model().indices().map(index => this.Item(index))
		}

		@ $mol_mem
		scroll_reset() {
			this.search_text()
			this.lines_max()
			this.body_scroll_top(0)

			return null
		}

		override log_content() {
			if (! this.log_level()) return []
			return super.log_content()
		}

		override empty_content() {
			if (this.log_level()) return []
			return super.empty_content()
		}

		override up_enabled() {
			return this.body_scroll_top() > 0
		}

		override up_event() {
			this.body_scroll_top(0)
		}

		override auto() {
			this.scroll_reset()
			return super.auto()
		}
	}
}
