namespace $ {
	export function $yuf_sj_ui_device_mock_context(this: $) {
		return {
			$yuf_ws_socket: this.$yuf_ws_statefull_socket_mock,

			$yuf_sj_ui_login_model: this.$yuf_sj_ui_login_model_mock,

			$yuf_sj_ui_network_model: this.$yuf_sj_ui_network_model_mock,
			$yuf_sj_ui_device_reboot_model: this.$yuf_sj_ui_device_reboot_model_mock,
			$yuf_sj_ui_device_updater_model: this.$yuf_sj_ui_device_updater_model_mock,
			$yuf_sj_ui_device_store: this.$yuf_sj_ui_device_store_mock,
			$yuf_sj_ui_device_info_model: this.$yuf_sj_ui_device_info_model_mock,
			$yuf_sj_ui_description_model: $yuf_sj_ui_description_model_mock,

			$yuf_sj_ui_log_model: this.$yuf_sj_ui_log_model_mock,
			$yuf_sj_ui_log_model_lines: this.$yuf_sj_ui_log_model_mock_lines,
		}
	}
}
