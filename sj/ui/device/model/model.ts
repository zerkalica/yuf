namespace $ {

	const error_codes_map: Record<string, string> = {
		'1': 'AUTH_FAILED',
		'2': 'DEVICE_NOT_FOUND',
		'3': 'OBJECT_NOT_FOUND',
		'4': 'INVALID_OBJECT',
		'5': 'FILE_READ_ERROR',
		'6': 'SCRIPT_ERROR',
		'7': 'INTERNAL_ERROR',
	}

	export class $yuf_sj_ui_device_model extends $mol_object {
		@ $mol_mem
		ws() {
			return this.$.$yuf_ws_statefull.make({
				url: () => this.ws_url(),
				enabled: () => this.ws_enabled(),
				session: () => this.session(),
				code_normalize: error => this.code_to_error(error),
				heatbeat_enabled: () => this.heatbeat_enabled(),
				watchdog_enabled: () => this.watchdog_enabled(),
			})
		}

		@ $mol_mem
		devices() {
			return this.$.$yuf_sj_ui_device_store.make({
				ws: () => this.ws(),
				id: () => this.id(),
			})
		}

		ws_url() {
			const loc = this.$.$mol_dom_context.location
			const port = Number(loc.port || 0)
			return port ? `${loc.protocol.replace('http', 'ws')}//${loc.hostname}:${port + 1}` : '/ws'
		}

		code_to_error(error: number | string) {
			return error_codes_map['' + error] || ('' + error)
		}

		ws_enabled() {
			// return ! this.$.$yuf_browser_live.hidden()
			return true
		}

		heatbeat_enabled() { return true }
		watchdog_enabled() { return true }

		id() { return '' }

		session() { return this.$.$mol_one.$yuf_session }

		auto(): unknown[] {
			if (! this.session().logged()) return []

			return $mol_wire_race(
				() => this.info().serial(),
				() => this.description().name(),
				() => this.network().ip(),
			)
		}

		@ $mol_mem
		info() {
			return this.$.$yuf_sj_ui_device_info_model.make({
				ws: () => this.ws(),
				session: () => this.session(),
				id: () => this.id(),
			})
		}

		@ $mol_mem
		description() {
			return this.$.$yuf_sj_ui_description_model.make({
				ws: () => this.ws(),
				id: () => this.id(),
			})
		}

		@ $mol_mem
		title() {
			return this.description().name() ?? this.info().serial() ?? ''
		}

		@ $mol_mem
		network() {
			return this.$.$yuf_sj_ui_network_model.make({
				ws: () => this.ws(),
				id: () => this.id(),
			})
		}

		@ $mol_mem
		log() {
			return this.$.$yuf_sj_ui_log_model.make({
				ws: () => this.ws(),
				id: () => this.id(),
			})
		}

		@ $mol_mem
		auth() {
			return this.$.$yuf_sj_ui_login_model.make({
				ws: () => this.ws(),
				session: () => this.session(),
				id: () => this.id(),
			})
		}
	}
}

