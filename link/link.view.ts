namespace $.$$ {

	export class $yuf_link extends $.$yuf_link {
		@ $mol_mem
		override link_arg() {
			return {
				[this.param_name()]: this.param_value()
			}
		}

		protected dict(is_nulled?: boolean) {
			const arg = this.arg()
			const dict = this.$.$mol_state_arg.dict()
			const result = { } as Record<string, string | null>
			const arg_keys = Object.keys(arg)
			for (let self_key of arg_keys) {
				result[self_key] = is_nulled ? null : arg[self_key]
			}

			for (let dict_key in dict) {
				if (arg_keys.some(self_key => dict_key.startsWith(self_key))) continue
				result[dict_key] = dict[dict_key]
			}

			return result
		}

		@ $mol_mem
		default_selected() {
			const args = this.$.$mol_state_arg
			return this.default() && Object.keys(this.arg()).every(key => ! args.value(key))
		}

		override current() {
			return this.default_selected() || super.current()
		}

		override click(e?: Event) {
			if (( this.default_selected() || ! this.unselectable() ) && this.current() && e) {
				this.$.$mol_dom_event.wrap(e).prevented(true)
			}

			return super.click(e)
		}

		@ $mol_mem
		override uri() {
			return this.$.$mol_state_arg.make_link( this.dict() )
		}

		@ $mol_mem
		override uri_off() {
			return this.$.$mol_state_arg.make_link( this.dict(true) )
		}

	}
}
