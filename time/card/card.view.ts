namespace $.$$ {
	export class $yuf_time_card extends $.$yuf_time_card {
		protected current() {
			const moment = this.moment()
			return this.local() ? moment?.toOffset() : moment
		}

		override formatted_date() {
			return this.current()?.toString(this.formats()[this.format()]) ?? ''
		}

		override hint() {
			return this.current()?.toString(this.formats()['hint'] ?? '') ?? ''
		}
		
	}
}
