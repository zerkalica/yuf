namespace $ {
	export class $yuf_sj_ui_network_route_store_mock extends $yuf_sj_ui_network_route_store {
		override mock(next?: ReturnType<this['defaults']>) {
			const mock: readonly (typeof $yuf_sj_ui_network_route_model_dto.Value)[] = next ?? [
				{
					destination: '192.168.0.0/24',
					gateway: '192.168.10.10',
				},
				{
					destination: '192.168.1.1/24',
					gateway: '192.168.10.10',
				},
			]

			return mock as ReturnType<this['defaults']>
		}
	}
}
