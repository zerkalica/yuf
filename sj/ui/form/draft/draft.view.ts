namespace $.$$ {
	export class $yuf_sj_ui_form_draft extends $.$yuf_sj_ui_form_draft {
		
		override submit_activate_fork(e?: Event) {
			// prevent cancelling save task if other button pressed, while saving
			$mol_wire_async(this).submit_activate(e)
		}

		override result(next?: string | null) {
			return super.result(next) || (this.changed() ? this.changed_message() : '')
		}

	}
}
