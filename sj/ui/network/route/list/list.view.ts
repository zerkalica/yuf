namespace $.$$ {
	export class $yuf_sj_ui_network_route_list extends $.$yuf_sj_ui_network_route_list {

		override remove_event(id: string, event?: Event) {
			const routes = this.routes()
			routes.by_id(id).remove()
			routes.id_remove(id)
		}

		override draft_id() {
			return '' + this.ids().length + 1
		}

	}

}
