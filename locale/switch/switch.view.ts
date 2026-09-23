namespace $.$$ {
	export class $yuf_locale_switch extends $.$yuf_locale_switch {
		override lang(next?: string) { return this.$.$mol_locale.lang(next) }
		@ $mol_mem
		override dictionary(next?: Record<string, string>) {
			return next ?? Object.fromEntries(this.langs().map(code => [ code, code ]))
		}
	}
}
