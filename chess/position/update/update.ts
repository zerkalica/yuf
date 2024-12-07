namespace $ {
	/**
	 * Применяет ход по правилам шахмат к переданному состоянию доски.
	 */
	export function $yuf_chess_position_update(
		positions: ($yuf_chess_piece_id | null)[][],
		move: $yuf_chess_move
	) {
		const [from_x, from_y] = $yuf_chess_position_pack(move.from)
		const [to_x, to_y] = $yuf_chess_position_pack(move.to)

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
}
