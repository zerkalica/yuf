namespace $.$$ {
	function split(str: string) {
		return str.split(/[\n\t,]/).map(str => str.trim()).filter(Boolean)
	}

	export class $yuf_localizer_settings_form extends $.$yuf_localizer_settings_form {
		@ $mol_mem
		override locales_str(next?: string) {
			return JSON.stringify(this.locales(
				next === undefined ? next : JSON.parse(next)
			) || '{}', null, '\t')
		}
	}
}
