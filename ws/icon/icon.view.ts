namespace $.$$ {
	export class $yuf_ws_icon extends $.$yuf_ws_icon {
		override path() {
			return this.status_icon()[this.status()]?.path() ?? super.path()
		}
	}
}
