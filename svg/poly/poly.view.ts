namespace $.$$ {
	export class $yuf_svg_poly extends $.$yuf_svg_poly {
		override animate() {
			return this.selected() ? super.animate() : []
		}

		override marker(key: 'start' | 'mid' | 'end') {
			const id = this[`Marker_${key}`]()?.dom_id()

			return id ? `url("#${encodeURI(id)}")` : null
		}

	}
}
