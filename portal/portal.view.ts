namespace $.$$ {
	export class $yuf_portal extends $.$yuf_portal {

		static current = null as null | $yuf_portal

		override destructor() {
			this.$.$yuf_portal.current = null
		}

		@ $mol_mem
		override showed(next?: boolean) {
			return this.popups().some(popup => popup.showed(next))
		}

		override display() {
			return ! this.showed() ? 'none' : null
		}

		override click(e?: Event) {
			e && $mol_dom_event.wrap(e).prevented(true)
			this.showed(false)
		}

		@ $mol_action
		override popup_add( next: $yuf_portal_popup ) {
			this.popups([ ... this.popups(), next])
			return next
		}

		@ $mol_action
		override popup_remove( next: $yuf_portal_popup ) {
			this.popups(this.popups().filter(popup => popup !== next ))
			return next
		}

		@ $mol_mem
		override bubbles() {
			this.$.$yuf_portal.current = this
			return this.popups().filter(popup => popup.showed()).map(pop => pop.Bubble())
		}
	}
}
