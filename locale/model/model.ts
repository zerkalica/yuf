namespace $ {
	export class $yuf_locale_model extends $mol_object {
		lang(next?: string) { return this.$.$mol_locale.lang(next) }

		langs_available() {
			return {
				ru: 'РУ',
				en: 'EN'
			}
		}
	}
}
