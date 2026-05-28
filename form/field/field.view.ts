namespace $.$$ {
	export class $yuf_form_field extends $.$yuf_form_field {
		
		
		@ $mol_mem
		form_fields() {
			return [ ... this.Content().view_find( view => view instanceof $mol_form_field ) ]
				.map( path => path[ path.length - 1 ]  ) as any as readonly $mol_form_field[]
		}

		override bids() {
			return this.form_fields().map(item => item.bids())
		}

	}
}
