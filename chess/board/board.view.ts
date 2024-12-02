namespace $.$$ {
	export class $yuf_chess_board extends $.$yuf_chess_board {
		override active_value() {
			const model = this.model()
			const color = model.active_color()
			const status = model.status()
			return color === (status ? 'w' : 'b') ? this.active_value_black() : this.active_value_white()
		}

		override fields_content() {
			if (this.ruler_enabled()) return super.fields_content()
			const Left = this.Left()
			const Right = this.Right()
			const Bottom = this.Bottom()

			return super.fields_content().filter(el => el !== Left && el !== Right && el !== Bottom)
		}

		override active_title() {
			const model = this.model()
			const status = model.status()
			if (! status) return this.move_title()

			return status  ? this.win_title() : this.draw_title()
		}

		override reset() {this.model().started_at(null) }

		protected user_score() { return this.model().user_score() }

		@ $mol_mem
		override score_value() {
			const score = this.user_score()
			if (! score) return super.score_value()
			return '' + score
		}

		override toolbar_content() {
			const user_has_move = this.user_score()
			return super.toolbar_content().filter(el => el === this.Score_field() ? user_has_move : true)
		}

		override help(e: Event) {
			const best = this.model().tops()[0]
			if (! best) return
			this.click(this.selected() === best.from ? best.to : best.from)
		}

		override undo_enabled() { return this.model().moves().length > 0 && ! this.model().bot_active() }
		override help_enabled() { return ! this.model().bot_active() }
		override reset_enabled() { return ! this.model().bot_active() }

		@ $mol_mem
		override gameover(): string {
			try {
				const bot_active = this.model().bot_active()
				return this.model().status() ? (bot_active ? 'user-win' : 'bot-win') : ''
			} catch (e) {
				$mol_fail_log(e)
				return $mol_wire_probe(() => this.gameover()) ?? ''
			}
		}

		override cell_color(id: $yuf_chess_position) { return this.$.$yuf_chess_model.cell_color(id) }
		override cell_hint(id: $yuf_chess_position) { return this.model().piece_type(id) ?? '' }
		override cell_id(id: $yuf_chess_position) { return id }

		ids() { return this.$.$yuf_chess_model.ids }

		@ $mol_mem
		override cells() {
			return this.ids().map(position => this.Cell(position))
		}

		@ $mol_mem_key
		override Cell_piece(position: $yuf_chess_position) {
			const piece_id = this.model().piece_id(position)
			return piece_id ? this.Piece(piece_id) : null
		}

		override undo_event(e?: Event) {
			e?.preventDefault()
			this.model().undo()
		}

		override piece_type(piece: $yuf_chess_piece_id) { return piece[0] }

		@ $mol_mem
		selected(next?: $yuf_chess_position | null) {
			// сбрасывать selected, если походили в через help
			this.model().moves()
			if ( this.gameover() ) return null
			if (this.model().move()) return null

			if (next && ! this.model().legal(next)) return null
			// если доступна только одна позиция, когда вам шах - подсветим ее
			return next ?? this.model().check_position()
		}

		@ $mol_mem_key
		override hilited(target: $yuf_chess_position) {
			const selected = this.selected()
			const legal = selected ? this.model().legal(selected) : null
			return Boolean(legal?.[target]) || selected === target
		}

		override move_enabled(pos: $yuf_chess_position) { return ! this.model().bot_active() }

		override click(current: $yuf_chess_position, e?: Event) {
			e && $mol_wire_sync(e).preventDefault()
			const selected = this.selected()
			const model = this.model()
			const current_type = model.piece_type(current)
			const current_color = current_type ? $yuf_chess_model.piece_color(current_type) : null
			const bot_color = model.bot_color()

			if (! selected && ( ! current_type || current_color === bot_color ) ) return null

			if (! selected || (current_color && current_color !== bot_color) ) {
				return this.selected(current === selected ? null : current)
			}

			this.model().move({ from: selected, to: current })
			this.selected(null)
		}

		@ $mol_mem
		override bottom() { return this.$.$yuf_chess_model.x_names.map(id => this.X_rule(id)) }
		override x_name(id: string) { return id }

		@ $mol_mem
		override left() { return this.$.$yuf_chess_model.y_names.map(id => this.Y_rule(id + 'l')) }
		@ $mol_mem
		override right() { return this.$.$yuf_chess_model.y_names.map(id => this.Y_rule(id + 'r')) }
		override y_name(id: string) { return id.slice(0, -1) }
	}
}

