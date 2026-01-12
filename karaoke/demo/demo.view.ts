namespace $.$$ {
	export class $yuf_karaoke_demo extends $.$yuf_karaoke_demo {
		
		@ $mol_memo.field
		get $() {
			return super.$.$mol_ambient( {
				$yuf_ws_socket: super.$.$yuf_ws_statefull_socket_mock,
				$yuf_karaoke_store: super.$.$yuf_karaoke_store_mock,
				$yuf_karaoke_model: super.$.$yuf_karaoke_model_mock,
			} )
		}
		
	}
}
