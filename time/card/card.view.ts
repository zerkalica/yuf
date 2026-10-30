namespace $.$$ {
	export class $yuf_time_card extends $.$yuf_time_card {
		override lang() { return this.$.$mol_locale.lang() }

		protected native() {
			const moment = this.moment()
			return (this.local() ? moment?.toOffset() : moment)?.native ?? null
		}

		protected format_value(format: string) {
			const native = this.native()
			return ! native ? '' : this.$.$yuf_time_native_format(this.lang(), format, native)
		}

		override formatted_date() { return this.format_value(this.format()) }
		override hint() { return this.format_value(this.format_hint()) }
	}
}
