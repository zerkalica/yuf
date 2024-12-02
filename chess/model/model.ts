namespace $ {

	export class $yuf_chess_model extends $mol_object {
		static x_names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
		static y_names = ['8', '7', '6', '5', '4', '3', '2', '1']

		static x_name_index = this.x_names.reduce((acc, name, index)=> {
			acc[name] = index
			return acc
		}, {} as Record<string, number>)

		static y_name_index = this.y_names.reduce((acc, name, index)=> {
			acc[name] = index
			return acc
		}, {} as Record<string, number>)

		static ids = this.y_names.flatMap(y_name => this.x_names.map(x_name => `${x_name}${y_name}` as $yuf_chess_position))

		static position(id: $yuf_chess_position) {
			return [this.x_name_index[id[0]] ?? 0, this.y_name_index[id[1]] ?? 0] as const
		}

		static piece_color(v: string | null) {
			return v === 'r' || v === 'n' || v === 'b' || v === 'q' || v === 'k' || v === 'b' || v === 'p' ? 'b' : 'w'
		}

		static cell_color(id: $yuf_chess_position) {
			const [x, y] = this.position(id)
			return Boolean((x + y) % 2) ? 'b' : 'w'
		}

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
			const index = this.bot_active() ? -1 : -2
			return this.moves().at(index)?.score
		}

		score(move: $yuf_chess_move) {
			const valid = this.legal(move.from)?.[move.to]
			if (! valid) return null
			const current = this.tops().find(best => best.from === move.from && best.to === move.to)
			return current?.score ?? 1
		}

		@ $mol_mem
		bot_active() { return this.active_color() === this.bot_color() }

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
		move_enrich(move: $yuf_chess_move) {
			const promotion = move.promotion ?? this.legal(move.from)?.[move.to]?.[0] ?? null
			const score = move.score ?? this.score(move)
			if (! score) return null

			const color = this.active_color()

			return { ...move, promotion, score, color }
		}

		@ $mol_mem
		move(move?: $yuf_chess_move | null) {
			if (! move) return null

			const normalized = this.move_enrich(move)
			if (normalized) this.move_push(normalized)

			return normalized
		}

		@ $mol_action
		move_push(move: $yuf_chess_move) {
			this.moves([ ...this.moves(), move ])
		}

		static move_apply(positions: ($yuf_chess_piece_id | null)[][], move: $yuf_chess_move) {
			const [from_x, from_y] = this.position(move.from)
			const [to_x, to_y] = this.position(move.to)

			const piece_type = (positions[from_y][from_x]?.[0] ?? null) as (null | $yuf_chess_piece_type)

			if (( piece_type === 'p' || piece_type === 'P' ) && from_x !== to_x && from_y !== to_y && ! positions[to_y][to_x]) {
				// Взятие на проходе
				const shift_y = to_y > from_y ? -1 : 1
				positions[to_y + shift_y][to_x] = null
			}

			// Превращение пешки
			const promotion_type = ! move.promotion ? null : piece_type === 'p'
				? move.promotion
				: move.promotion.toUpperCase() as $yuf_chess_piece_type

			const existing_piece_indices = ! promotion_type ? null
				: positions.map(row => row.find(cell => cell?.[0] === promotion_type)?.[1] ?? null)
					.map(index => index !== null ? Number(index) : null)

			// переиспользуем индексы съеденных фигур, если они есть
			const promotion_index = existing_piece_indices
				? ([ 0, 1, 2, 3 ].find(i => ! existing_piece_indices?.includes(i) ) ?? 0)
				: 0

			positions[to_y][to_x] = promotion_type
				? `${promotion_type}${promotion_index}` as $yuf_chess_piece_id
				: positions[from_y][from_x]

			positions[from_y][from_x] = null

			if ((piece_type === 'k' || piece_type === 'K') && Math.abs(to_x - from_x) === 2 && from_y === to_y) {
				// castling, рокировка
				const sign = to_x > from_x ? 1 : -1
				let rook_from_x = to_x
				do {
					rook_from_x += sign
					const rook = positions[to_y][rook_from_x]?.[0]
					if (rook === 'r' || rook === 'R') {
						const rook_to_x = to_x - sign
						positions[to_y][rook_to_x] = positions[from_y][rook_from_x]
						positions[from_y][rook_from_x] = null
						break
					}
				} while(rook_from_x >= 0 && rook_from_x <= 7)
			}

			return positions
		}
		
		@ $mol_mem
		positions() {
			const positions = this.fen_initial_parts().positions.map(row => row.slice())
			let moves = this.moves()

			for (const move of moves) {
				this.$.$yuf_chess_model.move_apply(positions, move)
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

		move_color(move_count = 0) {
			const side_initial = this.fen_initial_parts().side

			const color = (move_count % 2) === 0 ? side_initial : ( side_initial === 'w' ? 'b' : 'w' )
			return color
		}

		@ $mol_mem
		active_color() {
			const color = this.move_color(this.moves().length)
			return color
		}

		bot_color() { return 'b' as $yuf_chess_side }

		piece_type(id: $yuf_chess_position) {
			return ( this.piece_id(id)?.[0] ?? null ) as null | $yuf_chess_piece_type
		}

		piece_id(id: $yuf_chess_position): $yuf_chess_piece_id | null {
			const [x, y] = this.$.$yuf_chess_model.position(id)
			const positions = this.positions()
			return positions[y][x]
		}


		legal(pos: $yuf_chess_position) {
			return null as Record<$yuf_chess_position, readonly $yuf_chess_promotion[] | null> | null
		}

		check_position() { return null as null | $yuf_chess_position }

		@ $mol_mem
		status() {
			return null as null | 'checkmate' | 'draw' | 'stalemate' // мат, ничья, пат
		}
	}
}
