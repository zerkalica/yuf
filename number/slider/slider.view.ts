namespace $.$$ {
	export class $yuf_number_slider extends $.$yuf_number_slider {
		
		override step() {
			return this.precision_change() * this.boost()
		}

	}
}
