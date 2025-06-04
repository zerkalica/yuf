namespace $.$$ {
	export class $yuf_keyboard_demo extends $.$yuf_keyboard_demo {
		
		@ $mol_mem
		override Keyboard_target( next?: $mol_view ) {
			if (! this.keyboard_enabled()) return null
			if (next !== undefined) return next

			return next ?? null
		}

		override auto() {
			if (this.pass_focused()) this.Keyboard_target(this.Pass())
			if (this.username_focused()) this.Keyboard_target(this.Username())
			return super.auto()
		}

		@ $mol_mem
		override keyboard_enabled(next?: boolean) {
			if (next) {
				new $mol_after_frame(() => this.Username().focused(true))
			}

			return next ?? false
		}

		override form_fields_with_keyboard() {
			const fields = this.form_fields()
			const target = this.Keyboard_target()
			if (! target ) return fields

			new $mol_after_frame(() => target.focused(true))

			if (target === this.Username()) {
				return [ this.Username_label(), this.Keyboard(), this.Password_label() ]
			}

			return [ ...fields, this.Keyboard() ]
		}
		
	}
}
