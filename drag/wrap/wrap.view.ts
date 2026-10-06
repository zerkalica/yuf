namespace $.$$ {
	export class $yuf_drag_wrap extends $.$yuf_drag_wrap {
		
		// override file_names() { return this.files().map(file => file.name).join('\n') }

		override drag_start( event : DragEvent ) {
			const items = event.dataTransfer!.items
			items.clear()
			this.files().forEach(file => items.add(file))
			return super.drag_start(event)
		}

	}
}
