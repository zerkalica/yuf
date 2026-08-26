namespace $.$$ {
	export class $yuf_sj_jammer_task_form extends $.$yuf_sj_jammer_task_form {

		@ $mol_mem_key
		override value_number( field: string, next? : number | null ) {
			return Number( this.value( field, next ) ?? Number.NaN)
		}

		override freq_value(key: 'min' | 'max', next?: number) {
			return this.value_number(key === 'min' ? 'freq_min' : 'freq_max', next)
		}

		override freq_range_content() {
			return this.model().auto() ? [] : super.freq_range_content()
		}

		override freq_range_edit_enabled() {
			return ! this.model().auto()
		}

		override submit(e?: Event) {
			const ok = super.submit(e)
			if (ok) this.submitted(e)
			return ok
		}

		override submit_title() {
			return this.model().status() ? super.submit_title() : this.submit_title_run()
		}

	}
}
