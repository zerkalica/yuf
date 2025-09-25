namespace $.$$ {
	export class $yuf_catalog_app extends $.$yuf_catalog_app {

		@$mol_mem
		override pages() {
			const logged = this.logged()
			if ( logged ) return super.pages()
			return [ this.Login() ]
		}

		override menu_links_authorized() {
			return this.logged() ? super.menu_links_authorized() : []
		}

		override menu_links_no_authorized() {
			return this.logged() ? [] : super.menu_links_no_authorized()
		}

		override logout_click(e?: Event) {
			this.logout()

			this.$.$mol_wait_timeout(100)

			const arg = this.$.$mol_state_arg

			const link = arg.link(this.spread_close_arg())
			arg.href(link)
		}

		override placeholders() {
			return this.spread() || ! this.logged() ? [] : super.placeholders()
		}

	}
}
