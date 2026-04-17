namespace $.$$ {
	export class $yuf_confirm_pick extends $.$yuf_confirm_pick {
		
		override no_click() {
			this.showed(false)
		}

		override click_yes(e?: Event) {
			this.confirm(e)
			this.showed(false)
		}
		
	}
}
