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
			return $mol_error_fence(() => Boolean(this.from() || this.to()), e => ($mol_fail_log(e), true))
		}
	}

	export class $yuf_date_range_date extends $.$yuf_date_range_date {

		override value_moment(next?: $mol_time_moment | null) {
			const end = this.end()

			return this.moment(next
				? next.merge({
					offset: next.offset ?? new $mol_time_moment().offset,
					hour: next.hour ?? (end ? 23 : 0),
					minute: next.minute ?? ( end ? 59 : 0),
					second: next.second ?? ( end ? 59 : 0),
				})
				: next
			) as $mol_time_moment
		}

		@ $mol_mem
		override value( val? : string ) {

			if( val === undefined ) return this.value_moment()?.toString( `YYYY-MM-DD${this.time_enabled() ? ' hh:mm' : ''}` ) ?? ''

			return super.value(val)
		}

	}
}
