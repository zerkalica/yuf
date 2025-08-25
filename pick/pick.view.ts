namespace $.$$ {
	export class $yuf_pick extends $.$yuf_pick {
		override portal() { return this.$.$yuf_portal._ }

		@ $mol_mem
		override showed(next?: boolean) {
			return this.portal() ? (next ?? false) : super.showed(next)
		}

		@ $mol_mem
		override sub_visible() {
			const portal = this.portal()
			portal?.popup_add(this)

			return [
				this.Anchor() ,
				... this.showed() && ! portal ? [ this.Bubble() ] : [] ,
			]
		}

		override destructor() {
			this.portal()?.popup_remove(this)
			super.destructor()
		}

	}
}
