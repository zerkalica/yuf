namespace $ {
	export type $yuf_chess_move = {
		from: $yuf_chess_position
		to: $yuf_chess_position
		promotion?: $yuf_chess_promotion | null
		score?: $yuf_chess_score | null
	}
}
