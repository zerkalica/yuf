namespace $.$$ {
	export class $yuf_form_draft extends $.$yuf_form_draft {
		@ $mol_mem
		override submit_title( next = '' ) {
			this.changed()
			return next || super.submit_title()
		}

		@ $mol_mem
		override rows(): readonly $mol_view[] {
			const has_footer = this.foot().length > 0
			const rows = super.rows()
			const res = rows.filter(el => (
				( has_footer || el !== this.Foot() )
			))

			return res
		}

		@ $mol_action
		override submit() {
			super.submit()
			this.submit_title( this.message_done() )
			this.done(true)
		}

		override reset_content() {
			try {
				if (! this.changed()) return []
			} catch (e) {
				if ($mol_promise_like(e)) return []
				$mol_fail_hidden(e)
			}

			return super.reset_content()
		}

		@ $mol_mem
		override submit_hint() {
			const error_fields = this.form_fields().filter(field => field instanceof $mol_form_field ? field.bid() : false)
			return error_fields.map(field => `${field.name()} ${field.bid()}`).join('\n')
		}
	}
}
