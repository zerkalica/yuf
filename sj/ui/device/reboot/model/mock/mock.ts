namespace $ {
	export class $yuf_sj_ui_device_reboot_model_mock extends $yuf_sj_ui_device_reboot_model {
		override mock(next?: ReturnType<this['defaults']> | null) {
			if (next?.password_old && next?.password_old !== '123') {
				throw new Error('Old password is wrong, right: 123')
			}

			return {
				...next,
			} as ReturnType<this[ 'defaults' ]>
		}
	}
}
