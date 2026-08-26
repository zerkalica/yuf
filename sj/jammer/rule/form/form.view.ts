namespace $.$$ {
	export class $yuf_sj_jammer_rule_form extends $.$yuf_sj_jammer_rule_form {

		override freq_value(key: 'min' | 'max', next?: number) {
			return this.value_number(key === 'min' ? 'freq_min' : 'freq_max', next)
		}

		override numbers_check(key: string) {
			const val = this.value_str(key)
			if (! val) return ''

			if (val.match(/^[\d_\,\-\.\s]+$/)) return ''

			return super.numbers_check(key)
		}

		override bind_uuid_required_bid() {
			if (! this.bind_uuid_required()) return ''
			return super.bind_uuid_required_bid()
		}

		override bind_uuid_content() {
			if (! this.bind_uuid_required()) return []
			return super.bind_uuid_content()
		}

		access(next?: 'a' | 'd') {
			return this.value_str('access', next) as 'a' | 'd'
		}

		override rule_content() {
			if (this.access() !== 'd') return []
			return super.rule_content()
		}

		override rule_allowed() {
			return ! this.changed() || this.submit_allowed()
		}

		override rule_event( next?: Event ) {
			this.access('a')
			if (this.submit_allowed()) this.submit(next)
		}

		override submit(e?: Event) {
			const res = super.submit(e)
			if (res) this.done(true)
			return res
		}

	}
}
