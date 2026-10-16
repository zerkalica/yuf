namespace $.$$ {
	export class $yuf_carousel_demo extends $.$yuf_carousel_demo {
		override image_url(id: string) {
			if (id === '100500') throw new Error($mol_rest_code[$mol_rest_code['Not Found']], { cause: { id } })
			return this.urls()[Number(id)]
		}
	}

	export class $yuf_carousel_demo_card extends $.$yuf_carousel_demo_card {
		override image_url(id: string) {
			return id
		}
	}
}
