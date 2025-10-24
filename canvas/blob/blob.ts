namespace $ {
	export class $yuf_canvas_blob extends $yuf_object {
		host() { return this.$.$yuf_canvas_host._(this.$) }
		context() { return this.host().context2D() }

		protected cancel = null as null | (() => void )

		render_task(next?: Promise<Blob>) { return this.host().render_task(next) }
		image_type() { return 'image/png' }
		quality() { return .99 }

		render_options() {
			const context = this.context()

			return {
				context,
				canvas: context.canvas,
				type: this.image_type(),
				quality: this.quality(),
			}
		}

		async draw( opts: ReturnType<typeof this.render_options>) {}

		async snapshot(opts: ReturnType<typeof this.render_options>) {
			const { context, canvas, quality, type } = opts

			if (this.dead) return new Blob()

			context.save()

			try {
				await this.draw(opts)

				const blob = this.dead ? new Blob() : await canvas.convertToBlob({ type, quality })

				context.restore()

				return blob
			} catch (e) {
				context.restore()
				$mol_fail_hidden(e)
			}
		}

		async blob_async(opts: ReturnType<typeof this.render_options>) {
			let task

			this.dead = false
			this.cancel?.()

			do {
				task = this.render_task()

				try {
					await task
				} catch {
					//
				}
				if (this.dead) return new Blob()
			} while (task !== this.render_task())

			const promise = this.snapshot(opts)
			this.render_task(promise)
			return promise
		}

		protected dead = false

		@ $mol_mem
		blob() {
			return $mol_wire_sync(this).blob_async(this.render_options())
		}

		@ $mol_mem
		object_url() {
			return URL.createObjectURL(this.blob())
		}

		override destructor() {
			this.dead = true
			const url = $mol_wire_probe(() => this.object_url())
			if (url) URL.revokeObjectURL(url)
			this.cancel?.()
		}
	}
}
