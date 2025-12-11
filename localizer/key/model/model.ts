namespace $ {
	export class $yuf_localizer_key_model extends $mol_object {
		id() { return '' }

		text_actual() {
			return null as null | string
		}

		text_main() {
			return null as null | string
		}

		text(next?: string | null) { return next ?? '' }

		is_new() {
			return this.text_main() !== null && ! this.text_actual()
		}

		is_not_used() {
			return this.text_main() === null && Boolean(this.text_actual())
		}
	}

}
