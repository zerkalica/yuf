namespace $ {
	export type $yuf_chess_piece_white = 'r' | 'n' | 'q' | 'k' | 'b' | 'p'
	export type $yuf_chess_piece_black = 'R' | 'N' | 'Q' | 'K' | 'B' | 'P'
	export type $yuf_chess_piece_type = $yuf_chess_piece_white | $yuf_chess_piece_black
	export type $yuf_chess_piece_id = `${$yuf_chess_piece_type}${number}`
}
