namespace $.$$ {
	export class $yuf_check_icon2 extends $.$yuf_check_icon2 {
		override hint() {
			return this.checked() ? this.hint_checked() : this.hint_unchecked()
		}

		override Icon() {
			if (this.icon_disabled()) return null
			return this.checked() ? this.Icon_checked() : this.Icon_unchecked()
		}
	}
}
