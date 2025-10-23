namespace $.$$ {
	export class $yuf_number extends $.$yuf_number {
		
		override blur_event() {
			const next = this.value(this.value_string() ? undefined : this.value_min())
			this.value_string(String(next || '0'))
		}
		
	}
}
