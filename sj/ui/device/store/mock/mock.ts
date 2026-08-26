namespace $ {

	export class $yuf_sj_ui_device_store_mock extends $yuf_sj_ui_device_store {
		override mock(next?: ReturnType<this['defaults']> | null) {
			return next ?? [
				'8437587m', '45675456m', '85768345s'
			] as ReturnType<this[ 'defaults' ]>
		}
	}

}
