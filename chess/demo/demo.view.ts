namespace $.$$ {
	export class $yuf_chess_demo extends $.$yuf_chess_demo {
		@ $mol_mem
		replic_player() {
			const info = this.chess_model().move()
			if (! info) return null

			$mol_wire_sync(console).log(info.color, 'moves to', info.from, info.to, 'score', info.score)
			this.$.$mol_wait_timeout(1000)

			this.chess_model().move(null)

			return null
		}

		@ $mol_mem
		override moves_str(next?: string | null) {
			return this.$.$mol_state_arg.value(this.state_key('chess'), next === undefined ? next : (next || null)) ?? ''
		}

		@ $mol_mem
		bot_move_player() {
			const model = this.chess_model()
			const best = model.bot_active() ? model.best() : null

			if (! best) return null

			this.chess_model().move(best)

			return null
		}

		override auto() {
			this.replic_player()
			this.bot_move_player()
		}
	}
}
