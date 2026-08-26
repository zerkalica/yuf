namespace $ {

	export class $yuf_sj_ui_network_model_mock extends $yuf_sj_ui_network_model {
		protected prev = null as ReturnType<typeof this.defaults> | null

		override mock(next?: ReturnType<typeof this.defaults> | null) {
			const network_type = next?.network_type ?? 'dhcp'
			if (network_type === 'dhcp') next = null
			const prev = this.prev

			if (prev && next) {
				// timeout if settings changed
				if (! $mol_compare_deep(prev, next) ) return null
			}

			return this.prev = {
				network_type,
				ip: next?.ip ?? (network_type === 'dhcp' ? '192.168.10.15/24' : '192.168.10.10/24'),
				gateway: next?.gateway ?? '192.168.1.1',
				dns: next?.dns ?? '192.168.1.1',
				dns2: next?.dns2 ?? '',
			}
		}
	}


}
