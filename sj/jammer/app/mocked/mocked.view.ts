namespace $.$$ {
	export class $yuf_sj_jammer_app_mocked extends $.$yuf_sj_jammer_app_mocked {
		@ $mol_memo.field
		get $() {
			return super.$.$mol_ambient( {
				... super.$.$yuf_sj_ui_device_mock_context(),

				$yuf_sj_jammer_rule_store: $yuf_sj_jammer_rule_store_mock,
				$yuf_sj_jammer_rule_model: $yuf_sj_jammer_rule_model_mock,

				$yuf_sj_ui_network_route_store: $yuf_sj_ui_network_route_store_mock,

				$yuf_sj_jammer_slave_store: $yuf_sj_jammer_slave_store_mock,

				$yuf_sj_jammer_sdr_model: $yuf_sj_jammer_sdr_model_mock,
				$yuf_sj_jammer_sdr_model_limits: $yuf_sj_jammer_sdr_model_mock_limits,

				$yuf_sj_jammer_task_model: $yuf_sj_jammer_task_model_mock,
				$yuf_sj_jammer_task_store: $yuf_sj_jammer_task_store_mock,
			} )
		}
	}
}
