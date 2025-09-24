namespace $.$$ {
	export class $yuf_catalog_app extends $.$yuf_catalog_app {
		@$mol_mem
		override pages(): readonly $mol_view[] {
			const prev  = $mol_wire_probe(() => this.pages())
			try {
				const logged = this.logged()
				if ( logged ) return super.pages()
				return [ this.Login() ]
			} catch (e) {
				if ($mol_promise_like(e)) return prev ?? []
				$mol_fail_hidden(e)
			}
		}

		override logout_click(e?: Event) {
			e && $mol_dom_event.wrap(e).prevented(true)
			this.logout()

			this.$.$mol_wait_timeout(100)

			const close_arg = this.spread_close_arg()
			const arg = this.$.$mol_state_arg
			const link = arg.link(close_arg)
			arg.href(link)
		}

		override placeholders() { return this.spread() || ! this.logged() ? [] : super.placeholders() }

	}
}
