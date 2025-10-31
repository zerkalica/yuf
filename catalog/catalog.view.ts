namespace $.$$ {
	export class $yuf_catalog extends $.$yuf_catalog {
		
		override param_base() {
			return [
				this.param_prefix(),
				this.param_suffix(),
			].filter(Boolean).join('_')
		}

		override menu_link_default(id: string) {
			return this.spread_default() === id
		}

		override spread( next?: string ) {
			return super.spread(next) || this.spread_default()
		}

		override spread_close_content() {
			const spread_default = this.spread_default()
			const current = this.spread()

			return current === spread_default || (spread_default && ! current)
				? []
				: super.spread_close_content()
		}
	}
}
