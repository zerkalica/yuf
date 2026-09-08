namespace $.$$ {
	export class $yuf_plot_note extends $.$yuf_plot_note {
		
		override transform() {
			const [ shift_x, shift_y ] = this.shift()
			return super.transform()
				.replace('{x}', shift_x.toFixed(2))
				.replace('{y}', shift_y.toFixed(2))
		}
		
	}
}
