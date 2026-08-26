namespace $ {
	const rec = $mol_data_record
	const num = $mol_data_number
	const str = $mol_data_string
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const vr = $mol_data_variant
	const cnst = $mol_data_const
	const arr = $mol_data_array

	export const $yuf_sj_ui_device_updater_model_dto = rec({
		type: $yuf_sj_ui_device_type,
		data: opt(nul(str)),
		progress: opt(nul(num)),
	})

	export class $yuf_sj_ui_device_updater_model extends $yuf_ws_entity<typeof $yuf_sj_ui_device_updater_model_dto.Value> {
		override type() { return 'firmware' }
		override device() {
			return this.id() ? [ this.id() ] : []
		}
		override defaults(raw?: {}) {
			return $yuf_sj_ui_device_updater_model_dto({
				type: 'JAMMER',
				data: null,
				progress: null,
				...raw,
			})
		}

		@ $mol_action
		protected file_buffer(file: File) {
			return new Uint8Array($mol_wire_sync(file).arrayBuffer())
		}

		@ $mol_action
		update(data: ReturnType<this['defaults']> & { file?: File }) {
			const file = data.file

			if (file) {
				data = {
					...data,
					file: undefined,
					data: $mol_base64_encode(this.file_buffer(file))
				}
			}

			this.data(data)
		}

		device_type() { return this.value('type') ?? '' }

		override draft_mem_only() {
			return true
		}

		@ $mol_mem
		progress(next?: number | null) {
			const actual = this.value('progress') ?? null

			if (next === undefined) return actual
			return next
		}

		@ $mol_mem
		supported_options() {
			const result = {} as Record<typeof $yuf_sj_ui_device_type.Value, string>

			for (const { config: name } of $yuf_sj_ui_device_type.config) {
				if (name === 'SDR') continue
				result[name] = name.replace('JAMMER_MODULE', 'MODULE')
			}

			return result
		}

	}

}
