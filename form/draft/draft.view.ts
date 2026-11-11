namespace $.$$ {
	export class $yuf_form_draft extends $.$yuf_form_draft {
		override model_push() {
			const model = this.model() as { data?(next: {}): unknown }
			if ( typeof model.data !== 'function') return super.model_push()

			const normalized = Object.fromEntries(this.state_normalized())
			const extra_data = this.extra_data()

			model.data?.({... normalized, ... extra_data })
			return null
		}

	}
}
