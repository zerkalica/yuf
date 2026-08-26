namespace $.$$ {
	export class $yuf_sj_jammer_task_controls extends $.$yuf_sj_jammer_task_controls {
		
		override confirm_content() {
			return this.model().status() === 'waiting' ? super.confirm_content() : []
		}

		override click_status(key: 'confirmed' | 'cancelled', e?: Event) {
			e && $mol_dom_event.wrap(e).prevented(true)
			this.model().status(key)
			this.submitted(e)
		}

		override remove( next?: Event ) {
			this.model().remove()
			this.submitted(next)
		}

		override remove_content() {
			return this.model().auto() || ! this.model().master() ? [] : super.remove_content()
		}
		
	}
}
