namespace $ {

	export const $yuf_chess_fen_default = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

	export function $yuf_chess_fen_parts(fen: string) {
		const [
			_,
			positions_str,
			side,
			castles,
			enpass,
			half_move_count,
			move_count,
		] = fen.match(/((?:[rnbqkp,1-8]+\/){7}[rnbqkp,1-8]+)\s+(b|w)\s+(?:([kq,a-h]{1,4})|\-)\s+(?:([a-h][36])|\-)\s+(\d{1,3})\s(\d{1,4})/i) ?? []

		const figure_count = {
			r: 0, n: 0, b: 0, q: 0, k: 0, p: 0,
			R: 0, N: 0, B: 0, Q: 0, K: 0, P: 0,
		} as Record<string, number>

		const positions = positions_str?.split('/').map(
			row_data => row_data.split('').reduce((acc, symbol) => {
				let repeats = Number(symbol)
				if (Number.isNaN(repeats)) repeats = 0
				for (let j = 0; j < repeats; j++) acc.push(null)
				if (repeats) return acc
				acc.push((symbol + (figure_count[symbol] || '0')) as $yuf_chess_piece_id)
				figure_count[symbol]++

				return acc
			}, [] as ($yuf_chess_piece_id | null)[])
		) ?? []

		return {
			positions,
			side: side as 'b' | 'w',
			castles: castles?.split('') as null | readonly $yuf_chess_castles[],
			enpass: (enpass ?? null) as null | $yuf_chess_position,
			halfmove_count: half_move_count ? Number(half_move_count) : null,
			move_count: move_count ? Number(move_count) : null,
		}
	}
}
