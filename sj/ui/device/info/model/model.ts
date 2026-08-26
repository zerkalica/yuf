namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const vr = $mol_data_variant
	const cnst = $mol_data_const
	const arr = $mol_data_array

	export const $yuf_sj_ui_device_info_model_dto = rec({
		type: $yuf_sj_ui_device_type,
		firmware_version: str,
		serial_number: str,
		uptime: num, // ms from device power on
		
		status: opt(nul($yuf_sj_ui_device_type_status)),
		status_updated_at: num, // ms from last device query
	})

	export class $yuf_sj_ui_device_info_model extends $yuf_ws_entity<typeof $yuf_sj_ui_device_info_model_dto.Value> {

		override type() { return 'info' }

		override device() {
			return this.id() ? [ this.id() ] : []
		}

		override defaults(raw?: {}) {
			return $yuf_sj_ui_device_info_model_dto({
				type: 'JAMMER',
				uptime: 0,
				firmware_version: '0.0.0',
				serial_number: '',
				status_updated_at: 0,
				status: null,

				...raw,
			})
		}

		@ $mol_mem
		uptime() { return new this.$.$mol_time_moment( Date.now() - (this.value('uptime') ?? 0) ) }

		@ $mol_mem
		uptime_dur() { return new this.$.$mol_time_duration( this.value('uptime') ?? 0) }

		device_status(next?: 'reset-planned' | null) { return this.value('status', next) ?? null }

		@ $mol_mem
		device_status_updated_at() {
			return new this.$.$mol_time_moment( Date.now() - (this.value('status_updated_at') ?? 0) )
		}

		@ $mol_mem
		reboot_enabled() {
			const status = this.device_status()
			return status === 'ok' || status === 'err'
		}

		reboot() {
			this.device_status('reset-planned')
			this.logout()
		}

		session() { return this.$.$mol_one.$yuf_session }

		logout_supported() {
			if ( this.id() || this.device().length) return false
			if (this.device_type() !== 'JAMMER') return false

			return true
		}

		logout() {
			if (! this.logout_supported()) return
			this.session().logout()
		}

		@ $mol_mem
		serial() { return this.value('serial_number') ?? '0.0.0' }

		device_type() { return this.value('type') ?? '' }

		version_check_url() { return '/version-latest' }

		@ $mol_mem_key
		version_latest(type: typeof $yuf_sj_ui_device_type.Value) {
			const text = this.$.$mol_fetch.success(this.version_check_url()).text()

			return text.match(/(\d+\.\d+\.\d+)/)?.[1] ?? ''
		}

		@ $mol_mem
		protected firmware() {
			return this.$.$yuf_sj_ui_device_updater_model.make({
				id: () => this.id(),
				ws: () => this.ws(),
			})
		}

		firmware_version() { return this.value('firmware_version') ?? '0.0.0' }

		@ $mol_mem
		protected password_model() {
			return this.$.$yuf_sj_ui_device_reboot_model.make({
				id: () => this.id(),
				ws: () => this.ws(),
			})
		}

		@ $mol_mem
		password(next?: { password_old: string, password_new: string }) {
			this.password_model().data(next)
			if (next !== undefined) this.logout()
			return null
		}
	}

}
