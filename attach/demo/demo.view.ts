namespace $.$$ {
	export class $yuf_attach_demo extends $.$yuf_attach_demo {
		
		override uploading(id: string) {
			this.$.$mol_wait_timeout(1000)
			const file = this.file(id)
			this.ids([...this.ids(), file.name ])
			this.item_drop(id)
			return false
		}

		override uploads() {
			return this.ids().map(id => this.Uploaded(id))
		}

		override upload_name(id: string) { return id }

	}
}
