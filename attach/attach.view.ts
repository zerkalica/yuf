namespace $.$$ {
	export class $yuf_attach extends $.$yuf_attach {

		override enabled() {
			return this.serial_uploads() ? this.ids().length === 0 : true
		}

		@ $mol_action
		override attach_new( files: readonly File[] ) {
			if (! this.enabled() ) return

			const next = {} as Record<string, File>

			for (const file of files) {
				const id = $mol_guid()
				next[id] = file
			}

			this.files({
				... this.files(),
				... next
			})
		}

		override file(id: string) { return this.files()[id]! } 

		@ $mol_mem
		override ids() {
			const files = this.files()
			return Object.keys(files).filter(id => files[id])
		}

		@ $mol_mem_key
		override uploading( id: string ): boolean {
			this.$.$mol_wait_timeout(1000)
			throw new Error('Implement upload')
		}

		@ $mol_mem
		override items_content() {
			return this.ids().map( id => this.Item(id) )
		}

		override item_drop( id: string, event?: Event | null) {
			this.removing(id)
			const next = { ...this.files(), [id]: null }
			this.files(next)
		}
	}

	export class $yuf_attach_item extends $.$yuf_attach_item {
		override is_image() { return Boolean(this.file_name().match(new RegExp(this.image_regexp(), 'g'))) }
		override item_uri() {
			return this.is_image() ? this.$.$yuf_url_object.from_blob(this.file()).url : ''
		}
		override file_name() { return this.file()?.name ?? '' }		
		override item_content() { return this.is_image() ? [ this.Image() ] : [] }
		override unknown_content() { return this.is_image() ? [] : [ this.Unknown() ] }

		override uploading_status() {
			try {
				return this.uploading() ? 'upload' : ''
			} catch (e) {
				if ( $mol_promise_like(e) ) return 'upload'
				return 'error'
			}
		}

		@ $mol_mem
		status(next?: [ Error | PromiseLike<unknown> ]) {
			try {
				if (next) return next
				this.uploading()
				return []
			} catch (e) {
				if ($mol_promise_like(e)) return [] 
				return [e]
			}
		}
	}

	export class $yuf_attach_unknown extends $.$yuf_attach_unknown {
		override ext() { return this.file_name().match('\.([^.]+)$')?.[1] ?? '' }
	}
}
