namespace $.$$ {
	export class $yuf_camera_recorder_icon extends $.$yuf_camera_recorder_icon {
		
		override path() {
			return this.status_icon()[this.status()]?.path() ?? super.path()
		}
		
	}
}
