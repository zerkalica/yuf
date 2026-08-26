namespace $ {

	export class $yuf_sj_ui_description_model_mock extends $yuf_sj_ui_description_model {
		override mock(next?: ReturnType<this['defaults']> | null) {
			if (next) return undefined

			return {
				name: ('dev-' + $mol_stub_code()),
				description: $mol_stub_message(300),
			} as ReturnType<this[ 'defaults' ]>
		}
	}

}
