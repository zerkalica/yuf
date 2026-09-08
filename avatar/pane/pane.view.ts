namespace $.$$ {
	export class $yuf_avatar_pane extends $.$yuf_avatar_pane {
		@ $mol_mem
		override crop_geometry() {
			let points = this.crop_points()
			if( points.length === 0 ) return ''

			const [ ax, ay ] = points[0]
			const [ bx, by ] = points[1]
			const f = (a: number, b: number) => `${a.toFixed(3)},${b.toFixed(3)}`
			return `M ${f(ax, ay)} L ${f(bx, ay)} ${f(bx, by)} ${f(ax, by)} Z`
		}
	}
}
