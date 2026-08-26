namespace $ {

	export class $yuf_sj_ui_device_updater_model_mock extends $yuf_sj_ui_device_updater_model {
		override mock_periodically() {
			return true
		}

		override mock(next?: ReturnType<this['defaults']> | null) {
			let progress = next?.progress ?? null
			if (progress !== null) {
				progress += 50
				if (progress >= 100) progress = 100
			}

			if (next?.data) progress = 0

			return {
				...next,
				data: null,
				progress,
			} as ReturnType<this[ 'defaults' ]>
		}
	}

}
