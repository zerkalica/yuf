namespace $.$$ {
	export class $yuf_carousel_demo extends $.$yuf_carousel_demo {
		override image_url(id: string) {
			if (id === '100500') throw new Error($mol_rest_code[$mol_rest_code['Not Found']], { cause: { id } })
			return this.urls()[Number(id)]
		}

		override card2_title() {
			return super.card2_title().replace('{index2}', this.index2().toFixed(0))
		}

	}

	export class $yuf_carousel_demo_card extends $.$yuf_carousel_demo_card {
		override nav(id: 'prev' | 'next', e?: Event) {
			this.index( this.index() + (id === 'prev' ? -1 : 1) )
		}
		override image_url(id: string) {
			return id
		}
	}
}
