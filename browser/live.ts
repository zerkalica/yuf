namespace $ {
	export class $yuf_browser_live extends $mol_object {
		protected static doc() {
			return this.$.$mol_dom_context.document
		}

		protected static create_event(
			name: Parameters<ReturnType<typeof this.doc>['addEventListener']>[0],
			cb: (e: Event) => void,
			useCapture?: boolean | AddEventListenerOptions
		) {
			const doc = this.doc()
			const synced = $mol_wire_async(cb)
			doc.addEventListener(name, synced, useCapture)

			return { destructor: () => doc.removeEventListener(name, synced) }
		}

		@ $mol_mem
		static fullscreen_node(next?: Element | null) {
			const doc = this.doc()
			if (next === null && doc.fullscreenElement) doc.exitFullscreen()
			if (next) next?.requestFullscreen()
			if (next === undefined) this.fullscreen_handler()

			return next ?? doc.fullscreenElement ?? null
		}

		@ $mol_mem
		protected static fullscreen_handler() {
			return this.create_event(
				'fullscreenchange',
				() => this.fullscreen_node(this.doc().fullscreenElement ?? null)
			)
		}

		@ $mol_mem
		static hidden(next?: null) {
			if (next === undefined) this.hidden_handler()
			return this.doc().hidden ?? false
		}

		@ $mol_mem
		protected static hidden_handler() {
			return this.create_event(
				'visibilitychange',
				() => this.hidden(null),
				false
			)
		}
	}
}
