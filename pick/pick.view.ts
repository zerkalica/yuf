namespace $.$$ {
	export class $yuf_pick extends $.$yuf_pick {
		override portal() { return this.$.$yuf_portal._ }

		@ $mol_mem
		override showed(next?: boolean) {
			return this.portal() ? (next ?? false) : super.showed(next)
		}

		override height_max() {
			const viewport = this.$.$mol_window.size()
			return this.portal() ? viewport.height : super.height_max()
		}

		@ $mol_mem
		override sub_visible() {
			const portal = this.portal()

			if (! portal) return super.sub_visible()

			portal.popup_add(this)

			return [ this.Anchor() ]
		}

		override destructor() {
			this.portal()?.popup_remove(this)
			super.destructor()
		}

	}
}
