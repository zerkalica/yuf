namespace $ {
	export type $yuf_chess_piece_white = 'r' | 'n' | 'q' | 'k' | 'b' | 'p'
	export type $yuf_chess_piece_black = 'R' | 'N' | 'Q' | 'K' | 'B' | 'P'
	export type $yuf_chess_piece_type = $yuf_chess_piece_white | $yuf_chess_piece_black
	export type $yuf_chess_piece_id = `${$yuf_chess_piece_type}${number}`

	export function $yuf_chess_piece_color(v: string | null) {
		return v === 'r' || v === 'n' || v === 'b' || v === 'q' || v === 'k' || v === 'b' || v === 'p' ? 'b' : 'w'
	}
}
