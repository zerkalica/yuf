namespace $.$$ {
	export class $yuf_keyboard_field extends $.$yuf_keyboard_field {
		
		@ $mol_mem
		static keyboard_enabled(next?: boolean) {
			return next ?? false
		}

		@ $mol_mem
		static target(next?: $mol_view | null) {
			if (! this.keyboard_enabled()) return null
			return next || null
		}

		override keyboard_enabled(next?: boolean) {
			if (next) this.input_focused(true)
			return this.$.$yuf_keyboard_field.keyboard_enabled(next)
		}

		target(next?: $mol_view | null) {
			return this.$.$yuf_keyboard_field.target(next)
		}

		override auto() {
			if (this.input_focused()) new $mol_after_frame(() => this.target(this.Input()))
		}

		override trigger_content() {
			return this.trigger_enabled() ? super.trigger_content() : []
		}

		override keyboard_content() {
			return this.target() === this.Input() ? super.keyboard_content() : []
		}

		override Control() { return this.Input() }
		
	}
}
