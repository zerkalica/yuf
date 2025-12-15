namespace $ {
	export class $yuf_localizer_key_model extends $mol_object {
		id() { return '' }

		text_actual() {
			return null as null | string
		}

		text_main() {
			return null as null | string
		}

		text_stored(next?: string | null) { return next ?? '' }

		protected text_push_serial = $mol_wire_async((next: string | null) => this.text_push(next))

		protected text_push(next: string | null) {
			this.$.$mol_wait_timeout(200)
			return this.text_stored(next)
		}

		@ $mol_mem
		text(next?: string | null) {
			if (next === undefined) return this.text_stored()
			this.text_push_serial(next)
			return next ?? ''
		}

		is_changed() { return this.text() && this.text_actual() !== this.text() }

		is_new() {
			return Boolean(this.text_main()) && ! this.text_actual()
		}

		is_not_used() {
			return this.text_main() === null && Boolean(this.text_actual())
		}
	}

}
