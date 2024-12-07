namespace $.$$ {
	export class $yuf_chess_piece extends $.$yuf_chess_piece {
		override color() {
			return $yuf_chess_piece_color(this.type()) ?? 'w'
		}

		override path() {
			return this.icons()[this.type().toLowerCase()].path()
		}
		
	}
}
