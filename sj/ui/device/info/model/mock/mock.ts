namespace $ {
	function pick_status(exclude: readonly typeof $yuf_sj_ui_device_type_status.Value[]) {
		return $mol_array_lottery($yuf_sj_ui_device_type_status.config.map(item => item.config)
			.filter(item => ! exclude.includes(item))
		)
	}

	export class $yuf_sj_ui_device_info_model_mock extends $yuf_sj_ui_device_info_model {

		protected booted_at = Date.now()

		override mock_periodically() { return true }

		override mock(next?: ReturnType<this['defaults']>) {
			const status_updated_at = Date.now() - this.booted_at
			let status

			const id_part = this.id().at(-1)

			const type = id_part === 'm' ? 'JAMMER_MODULE' : id_part === 's' ? 'SDR' : 'JAMMER'

			if (next?.status === 'reset-planned') {
				status = 'resetting'
			} else {
				status = pick_status(['resetting', 'reset-planned']) as NonNullable<typeof next>['status'] | null
			}

			const serial_number = next?.serial_number ?? `${$mol_stub_code()}-${$mol_stub_code()}-${
				$mol_stub_code()}-${$mol_stub_code()}`

			return {
				...next,
				firmware_version: next?.firmware_version ?? this.pick_version_type(type),
				type: next?.type ?? type,
				serial_number,
				uptime: ( 3 * 24 * 60 * 60 + 2 * 60 * 60 + 5 * 60 + 30 ) * 1000 + status_updated_at,
				status,
				status_updated_at,
			} as ReturnType<this['defaults']>
		}

		protected pick_version_type(type: typeof $yuf_sj_ui_device_type.Value) {
			const version_suffix = $mol_guid(10).toLocaleUpperCase()
			const version_prefix = type === 'JAMMER' ? '1.0.0' : '0.0.2'
			return `${version_prefix}-${version_suffix}`
		}

		@ $mol_mem_key
		override version_latest(key: typeof $yuf_sj_ui_device_type.Value) {
			this.$.$mol_wait_timeout(1000)
			return key === 'JAMMER' ? '1.0.1' : '0.0.5'
		}
	}
}
