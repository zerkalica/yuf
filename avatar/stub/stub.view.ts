namespace $.$$ {

	export class $yuf_avatar_stub extends $.$yuf_avatar_stub {
		override letters() {
			 return this.name().split(' ').filter(Boolean).map(w => w.at(0)?.toUpperCase()).join('')
		}

		override bg_color() {
			const name = this.name()
			let hash = 0
			for (let i = 0; i < name.length; i++) {
				hash = name.charCodeAt(i) + ((hash << 5) - hash)
			}
			const hue = Math.abs(hash) % 360

			return this.bg_color_tpl().replace('{hue}', hue.toFixed(0))
		}

		override image_content() { return this.url() ? super.image_content() : [] }

	}
}
