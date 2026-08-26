namespace $.$$ {
	export class $yuf_sj_ui_device_catalog extends $.$yuf_sj_ui_device_catalog {
		override spread_title(id: string) {
			return this.model(id).title() ?? ''
		}

		@ $mol_mem
		override spread_ids_filtered() {
			const ids = super.spread_ids_filtered()
			const device_type = this.device_type()
			if (device_type) return ids.filter(id => this.model(id).info().device_type() === device_type)
			return ids
		}
	}

	export class $yuf_sj_ui_device_catalog_item extends $.$yuf_sj_ui_device_catalog_item {
		override reset_event(e?: Event) {
			e && this.$.$mol_dom_event.wrap(e).prevented(true)
			this.model().reboot()
		}

		override click(e?: Event) {
			e && this.$.$mol_dom_event.wrap(e).prevented(true)
		}
	}
}
