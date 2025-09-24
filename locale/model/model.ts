namespace $ {
	export class $yuf_locale_model extends $mol_object {
		@ $mol_memo.field
		static get _() { return new this() }

		lang(next?: string) { return this.$.$mol_locale.lang(next) }

		langs_available() {
			return {
				ru: 'РУ',
				en: 'EN'
			}
		}
	}
}
