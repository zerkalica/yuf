namespace $.$$ {
	export class $yuf_time_card extends $.$yuf_time_card {
		protected current() {
			const moment = this.moment()
			return this.local() ? moment?.toOffset() : moment
		}

		protected format_value() {
			return this.formats()[this.format()] || this.format() || this.formats().normal
		}

		override formatted_date() {
			return this.current()?.toString(this.format_value()) ?? ''
		}

		override hint() {
			return this.current()?.toString(this.formats()['hint'] ?? '') ?? ''
		}
		
	}
}
