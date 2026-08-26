namespace $.$$ {
	export class $yuf_sj_jammer_sdr_page extends $.$yuf_sj_jammer_sdr_page {
		
		override remove_event(id: string, e?: Event) {
			this.model().range_by_id(id).data(null)
		}

		override confirm_checked(next?: boolean) {
			return this.mode(next ? 'auto' : next === false ? 'manual' : undefined) === 'auto'
		}

		override mode_content() {
			return this.master() ? super.mode_content() : []
		}

		override freq_content() {
			return this.master() ? super.freq_content() : []
		}

	}
}
