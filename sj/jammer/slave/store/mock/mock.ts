namespace $ {
	export class $yuf_sj_jammer_slave_store_mock extends $yuf_sj_jammer_slave_store {
		override mock(next?: ReturnType<this['defaults']>) {
			const mock: readonly (typeof $yuf_sj_jammer_slave_model_dto.Value)[] = next ?? [
				{
					uri: 'admin:admin@192.168.1.5:53445',
				},
				{
					uri: 'admin:admin@192.168.1.1:53445',
				},
			]

			return mock as ReturnType<this['defaults']>
		}
	}
}
