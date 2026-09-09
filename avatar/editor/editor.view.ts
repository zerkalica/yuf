namespace $.$$ {
	export class $yuf_avatar_editor extends $.$yuf_avatar_editor {

		override attach_url() {
			const file = this.files()?.[0]
			return ! file ? null : this.$.$yuf_url_object.from_blob(file).url
		}

		override current_url() {
			return this.attach_url() ?? this.url() ?? ''
		}

		override pane_content() {
			return this.current_url() ? super.pane_content() : []
		}

		override url_exists() { return Boolean(this.current_url()) }
	}
}
