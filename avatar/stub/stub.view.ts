namespace $.$$ {

	export class $yuf_avatar_stub extends $.$yuf_avatar_stub {
		protected name_parts() { return this.name_or_login().split(/[\s,\/\\]/).filter(Boolean) }
		@ $mol_mem
		override letters() {
			return this.name_parts().slice(0, 2).map(w => w.at(0)?.toUpperCase()).join('')
		}

		override bg_color() {
			const name = this.name_parts().slice(0, 3).map(w => w.slice(0, 2)?.toUpperCase()).join('')
			let hash = 0
			for (let i = 0; i < name.length; i++) {
				hash = name.charCodeAt(i) + ((hash << 5) - hash)
			}
			const hue = (Math.abs(hash) * 137.508) % 360

			return this.bg_color_tpl().replace('{hue}', hue.toFixed(0))
		}

		override image_content() { return this.url() ? super.image_content() : [] }

		override name_or_login() { return this.name() || this.login() }

	}
}
