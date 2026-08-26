namespace $.$$ {
	export const dummy_template = new $mol_syntax2({
		'brace-open' : /\{{2}/ ,
		'brace-close' : /\}{2}/ ,
		'placeholder' : /\{(\w+)\}/ ,
	})

	export class $yuf_sj_ui_textarea extends $.$yuf_sj_ui_textarea {
		
		override syntax() {
			return dummy_template
		}
		
	}
}
