namespace $.$$ {

	export class $yuf_link extends $.$yuf_link {
		@ $mol_mem
		override link_arg() {
			return {
				[this.param_name()]: this.param_value()
			}
		}

		dict() {
			const self_args = this.arg()
			const dict = this.$.$mol_state_arg.dict()

			const result = {} as Record<string, string>

			for (let dict_key in dict) {
				for (let self_key in self_args) {
					if (! dict_key.startsWith(self_key)) {
						result[dict_key] = dict[dict_key]
					}
				}
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
			return this.$.$mol_state_arg.make_link( { ... this.dict(), ... this.arg() } )
		}

		@ $mol_mem
		override uri_off() {
			const result = { ...this.dict() } as Record<string, string | null>
			for (let key in this.arg()) result[key] = null
			return this.$.$mol_state_arg.make_link( result )
		}

	}
}
