namespace $.$$ {
	export class $yuf_sj_ui_freq_range extends $.$yuf_sj_ui_freq_range {
		
		protected bands_values() {
			return Object.values(this.bands())
		}
		override help_message() {
			const bands = this.bands_values()
			return bands.map(([min, max]) => `${min} - ${max}`).join(', ')
		}

		override limit() {
			return $yuf_sj_ui_range_expanded(this.bands())
		}

		
	}
}
