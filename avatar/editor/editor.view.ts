namespace $.$$ {
	export class $yuf_avatar_editor extends $.$yuf_avatar_editor {

		@ $mol_mem
		protected url_versions() {
			return this.blobs().map(blob => this.$.$yuf_url_object.from_blob(blob).url)
		}

		@ $mol_mem
		override value_blob(next?: Blob | null) {
			const url = this.value_data_url(next ? $yuf_url_data_encode(next) : next === null ? '' : next)
			if (next) return next
			return url ? $yuf_url_data_decode(url) : null
		}

		@ $mol_action
		protected value_cut() { return this.value_blob() }

		@ $mol_mem
		override blobs(next?: readonly Blob[]): readonly Blob[] {
			const initial = this.value_blob()
			if (next?.length) this.value_blob(next[0])

			return initial ? [initial, ...next ?? [] ] : next ?? []
		}

		@ $mol_mem
		override current_url() {
			return this.url_versions().at(-1) ?? ''
		}

		override pane_content() {
			return this.current_url() ? super.pane_content() : []
		}

		override url_exists() { return Boolean(this.current_url()) }

		override actions_content() {
			return this.note_id_selected() ? super.actions_content() : []
		}

		override undo_redo_content() {
			return this.note_id_selected() ? [] : super.undo_redo_content()
		}

		override instrument_enabled( id: string, next?: boolean ) {
			return this.note_id_selected(next === false ? '' : next ? id : next) === id
		}

		override instrument_close(next?: Event) {
			this.note_id_selected('')
		}

		override instrument_accept(next?: Event) {
			const id = this.note_id_selected()
			if (! id ) return
			const [ lt, rb ] = this.points(id) ?? []

			if (! lt || ! rb ) return

			if (id === 'crop') {
				const canvas = this.canvas()
				const blob = canvas.blob([
					{ crop: { lt, rb } },
					{ resize: { new_size: [ 512, 512 ] } },
				])

				this.blobs([ ... this.blobs(), blob ])

			}

			this.note_id_selected('')
		}

		@ $mol_mem
		override undo_enabled() { return this.url_versions().length > 1 }

		override undo(e?: Event) {
			this.blobs(this.blobs().slice(0, -1))
		}
	}

}
