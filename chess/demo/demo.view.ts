namespace $.$$ {
	export class $yuf_chess_demo extends $.$yuf_chess_demo {
		@ $mol_mem
		override moves_str(next?: string | null) {
			return this.$.$mol_state_arg.value(
				this.state_key('chess'),
				next === undefined ? next : (next || null)
			) ?? ''
		}

		override auto() {
			this.chess_model().auto()
		}
	}
}
