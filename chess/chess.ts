namespace $ {
	export type $yuf_chess_castles = 'k' | 'q' | 'K' | 'Q'
	export type $yuf_chess_promotion = 'r' | 'n' | 'b' | 'q'
	export type $yuf_chess_position = `${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'}${'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'}`
	export type $yuf_chess_score = 1 | 2 | 3 | 4 | 5
	export type $yuf_chess_move = {
		from: $yuf_chess_position
		to: $yuf_chess_position
		promotion?: $yuf_chess_promotion | null
		score?: $yuf_chess_score | null
	}
	export type $yuf_chess_side = 'b' | 'w'
}
