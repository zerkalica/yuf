namespace $.$$ {
	export class $yuf_sj_ui_book_form extends $.$yuf_sj_ui_book_form {
		
		override remove_content() {
			return this.draft() ? [] : super.remove_content()
		}

		override save_content() {
			return this.draft() ? [] : super.save_content()
		}

		override add_content() {
			return ! this.draft() ? [] : super.add_content()
		}

		override submit_allowed_and_changed() {
			return this.changed() && this.submit_allowed()
		}

		override reset_content() {
			return this.changed() ? super.reset_content() : []
		}

	}
}
