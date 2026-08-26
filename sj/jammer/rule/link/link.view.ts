namespace $.$$ {
	export class $yuf_sj_jammer_rule_link extends $.$yuf_sj_jammer_rule_link {

		override card_theme() {
			if (this.current()) return this.theme_selected()
			return this.theme_normal()
		}

		override created_at_formatted() {
			return this.model().created_at().toString(super.created_at_formatted())
		}

		override bind_uuid_content() {
			return this.model().bind_uuid_required() ? super.bind_uuid_content() : []
		}

		override bind_uuid() {
			return this.model().bind_uuid() ?? ''
		}

		override spreads_formatted() {
			return this.spreads().join(', ')
		}

		override freqs() {
			return this.freq_range_formatted()
				.replace('{freq_min}', this.freq_min()?.toFixed(0) ?? '')
				.replace('{freq_max}', this.freq_max()?.toFixed(0) ?? '')
		}

	}
}
