namespace $ {

	export class $yuf_chess_model extends $mol_object {

		checkers() { return [] as readonly $yuf_chess_position[] }

		@ $mol_mem
		moves_str(next?: string | null) { return next || '' }

		fen_initial() { return '' }
		fen_initial_normalized() { return this.fen_initial() || this.$.$yuf_chess_fen_default }

		moves_str_separator() { return '~' }

		@ $mol_mem
		moves(next?: readonly $yuf_chess_move[]) {
			const sep = this.moves_str_separator()
			if (next) {
				this.moves_str(next.map(move => `${move.from}${move.to}${move.promotion ?? ''}${move.score ? `-${move.score}` : ''}`).join(sep))
				return next
			}

			return this.moves_str()?.trim().split(sep)
				.map(str => {
					const [_, from, to, promotion, score] = str.match(/([a-h][1-8])([a-h][1-8])([rnbq])?(\d+)?/) ?? []
					if (! from || ! to) return null

					return ({
						from,
						to,
						promotion,
						score: score ? Number(score) : null
					} as $yuf_chess_move)
				})
				.filter($mol_guard_defined) ?? []
		}

		user_score() {
			const index = this.enemy_active() ? -1 : -2
			return this.moves().at(index)?.score
		}

		score(move: $yuf_chess_move) {
			const valid = this.legal(move.from)?.[move.to]
			if (! valid) return null
			const current = this.tops().find(best => best.from === move.from && best.to === move.to)
			return current?.score ?? 1
		}

		@ $mol_mem
		enemy_active() { return this.active_color() === this.enemy_color() }

		best() {
			if (this.status()) return null
			return this.tops()[0] ?? null
		}

		@ $mol_mem
		started_at(reset?: null) {
			if (reset === null) this.moves([])

			return Date.now()
		}

		reset() { this.started_at(null) }

		@ $mol_action
		protected move_enrich(move: $yuf_chess_move) {
			const promotion = move.promotion ?? this.legal(move.from)?.[move.to]?.[0] ?? null
			const score = move.score ?? this.score(move)
			if (! score) return null

			const color = this.active_color()

			return { ...move, promotion, score, color }
		}

		/**
		 * Кто-то из вне предлагает ход. Состояние шахмат меняется сразу.
		 * Пока предложение существует, другие ходы добавляться не могут.
		 * Также бот не может походить в ответ.
		 * 
		 * В этот момент может проигрываться реакция на ход.
		 * После проигрывания, нужно передать сюда null.
		 */
		@ $mol_mem
		move_suggest(move?: $yuf_chess_move | null) {
			if (! move) return null

			const normalized = this.move_enrich(move)
			if (normalized) this.move_push(normalized)

			return normalized
		}

		@ $mol_action
		move_push(move: $yuf_chess_move) {
			this.moves([ ...this.moves(), move ])
		}

		/**
		 * Актуальное состояние доски
		 */
		@ $mol_mem
		positions() {
			const positions = this.fen_initial_parts().positions.map(row => row.slice())
			let moves = this.moves()

			for (const move of moves) {
				$yuf_chess_position_update(positions, move)
			}

			return positions
		}

		@ $mol_action
		undo() {
			this.moves(this.moves().slice(0, -2))
		}

		@ $mol_mem
		level(next?: string) { return next ?? 'easy' }

		@ $mol_mem
		levels() {
			return [
				'easy', // 4
				'medium', // 8
				'hard', // 12
				'hardest', // 16
				'nightmare' // 20
			]
		}

		@ $mol_mem
		tops() {
			return [] as readonly $yuf_chess_move[]
		}

		@ $mol_mem
		protected fen_initial_parts() {
			return $yuf_chess_fen_parts(this.fen_initial_normalized())
		}

		/**
		 * Какой цвет активен на каком ходу
		 */
		protected move_color(move_count = 0) {
			const side_initial = this.fen_initial_parts().side
			if ( (move_count % 2) === 0 ) return side_initial

			return side_initial === 'w' ? 'b' : 'w'
		}

		/**
		 * Какой цвет сейчас активен
		 */
		@ $mol_mem
		active_color() {
			return this.move_color(this.moves().length)
		}

		enemy_color() { return 'b' as 'b' | 'w' }
		your_color() { return this.enemy_color() === 'b' ? 'w' : 'b' }

		piece_type(id: $yuf_chess_position) {
			return ( this.piece_id(id)?.[0] ?? null ) as null | $yuf_chess_piece_type
		}

		piece_color(id: $yuf_chess_position) {
			const current_type = this.piece_type(id)
			return current_type ? $yuf_chess_piece_color(current_type) : null
		}

		piece_id(id: $yuf_chess_position): $yuf_chess_piece_id | null {
			const [x, y] = this.$.$yuf_chess_position_pack(id)
			const positions = this.positions()
			return positions[y][x]
		}

		legal(pos: $yuf_chess_position) {
			return null as Record<$yuf_chess_position, readonly $yuf_chess_promotion[] | null> | null
		}

		check_position() { return null as null | $yuf_chess_position }

		/**
		 * null - игра не окончена
		 * Остальные значения: конец игры - мат, ничья или пат.
		 */
		@ $mol_mem
		status() {
			return null as null | 'checkmate' | 'draw' | 'stalemate' // мат, ничья, пат
		}

		/**
		 * Выбранная фигура для осуществления хода
		 */
		@ $mol_mem
		selected(next?: $yuf_chess_position | null) {
			// сбрасывать selected, если походили через help
			this.moves()

			// Без try/catch будет мерцать доска на каждый ход
			try {
				if ( this.status() ) return null
			} catch (e) {
				this.$.$mol_fail_log(e)
			}

			if ( this.move_suggest() ) return null

			if (next && ! this.legal(next)) return null
			// если доступна только одна позиция, когда вам шах - подсветим ее
			return next ?? this.check_position()
		}

		/**
		 * Подсвечивает варианты ходов для выбранной фигуры
		 */
		@ $mol_mem_key
		hilited(target: $yuf_chess_position) {
			const selected = this.selected()
			const legal = selected ? this.legal(selected) : null
			return Boolean(legal?.[target]) || selected === target
		}

		/**
		 * Первый клик - выбирает фигуру
		 * Второй клик - ходит фигурой, если это возможно
		 */
		select(next: $yuf_chess_position) {
			const prev = this.selected()
			const pos_type = this.piece_type(next)
			const pos_color = this.piece_color(next)
			const active_color = this.active_color()

			if (! prev && ( ! pos_type || pos_color !== active_color ) ) return null

			if (! prev || (pos_color && pos_color === active_color ) ) {
				return this.selected(next === prev ? null : next)
			}

			this.move_suggest({ from: prev, to: next })
			this.selected(null)
		}


		@ $mol_mem
		bot_move_player() {
			const best = this.enemy_active() ? this.best() : null

			if (! best) return null

			this.move_suggest(best)

			return null
		}

		@ $mol_mem
		replic_player() {
			const info = this.move_suggest()
			if (! info) return null

			$mol_wire_sync(console).log(info.color, 'moves to', info.from, info.to, 'score', info.score)
			this.$.$mol_wait_timeout(1000)

			this.move_suggest(null)

			return null
		}

		auto() {
			this.replic_player()
			this.bot_move_player()
		}
	}
}
