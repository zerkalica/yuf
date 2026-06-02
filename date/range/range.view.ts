namespace $.$$ {
	export class $yuf_date_range extends $.$yuf_date_range {
		override clear_all_click(e?: Event) {
			this.from_clear(e)
			this.to_clear(e)
		}

		override clear_all_content() {
			return this.clear_all_enabled() ? super.clear_all_content() : []
		}

		override clear_all_enabled() {
			return Boolean(this.from() || this.to())
		}
	}

	export class $yuf_date_range_date extends $.$yuf_date_range_date {
		
		override value_moment(next?: $mol_time_moment | null) {
			return this.moment(next) as $mol_time_moment
		}

	}
}
