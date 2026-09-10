namespace $ {
	export type $yuf_canvas_blob_op<Src, Keys extends string> = {
		[Key in Keys]?: Key extends keyof Src
			? Src[Key] extends (arg: infer Param) => any ? Param : never
			: never
	}


	export class $yuf_canvas_blob extends $mol_object {
		protected _canvas = null as null | $yuf_canvas_context
		canvas() { return this._canvas ?? (this._canvas = this.canvas_make([ 4096 , 4096 ]) ) }

		@ $mol_action
		canvas_make(size: readonly [number, number]) {
			return this.$.$yuf_canvas_context.from_size(size)
		}

		protected cancel = null as null | (() => void )

		protected _render_task = null as null | Promise<Blob>

		render_task(next?: Promise<Blob>) {
			if (next) this._render_task = next
			return this._render_task
		}

		image_type() { return 'image/png' }
		quality() { return .99 }

		protected apply_transforms(transforms: readonly (Record<string, unknown>)[]) {
			this.prepare()

			for (const transform of transforms) {
				for (const method of Object.keys(transform)) {
					if (! transform[method] || ! (method in this) || typeof this[method as keyof typeof this] !== 'function') {
						throw new Error('Method not found in canvas pipe', { cause: { method, transform }})
					}
					(this as unknown as Record<string, (p: unknown) => void>)[method](transform[method])
				}
			}
		}

		protected apply_transforms_task = $mol_wire_async(function(
			this: $yuf_canvas_blob,
			transforms: readonly (Record<string, unknown>)[]
		) { return this.apply_transforms(transforms) })

		async snapshot(transforms: readonly (Record<string, unknown>)[]) {
			const quality = this.quality()
			const canvas = this.canvas()
			const type = this.image_type()

			if (this.dead) return new Blob()

			canvas.d2.save()

			try {
				await this.apply_transforms_task(transforms)
				const blob = this.dead ? new Blob() : await canvas.native.convertToBlob({ type, quality })

				canvas.d2.restore()

				return blob
			} catch (e) {
				canvas.d2.restore()
				$mol_fail_hidden(e)
			}
		}

		async blob_async(transforms: readonly (Record<string, unknown>)[]) {
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

			const promise = this.snapshot(transforms)
			this.render_task(promise)
			return promise
		}

		protected dead = false

		protected deps() {
			// pull data and wait async ops to prevent clears while blob_async working
			this.node()
			this.canvas()
			this.quality()
			this.image_type()
		}

		override destructor() {
			this.dead = true
			this.cancel?.()
		}

		node(): CanvasImageSource {
			const url = this.image_url()
			if (! url ) throw new Error('Require setup CanvasImageSource DOM node')
			const image = new Image()
			image.src = url
			return image
		}

		image_url() { return '' }

		@ $mol_action
		crop( {
			lt: [left_top_x, left_top_y],
			rb: [right_bottom_x, right_bottom_y]
		}: {
			lt: readonly[number,  number]
			rb: readonly [number, number]
		} ) {
			const canvas = this.canvas()
			const width = right_bottom_x - left_top_x
			const height = right_bottom_y - left_top_y

			const tmp = this.canvas_make(canvas.size())
			tmp.d2.drawImage(canvas.native, 0, 0)

			canvas.size([width, height])
			canvas.d2.drawImage(tmp.native, left_top_x, left_top_y, width, height, 0, 0, width, height)
		}

		@ $mol_action
		resize( { new_size }: {
			new_size: readonly [number, number]
		} ) {
			const canvas = this.canvas()
			const size = canvas.size()
			if (size[0] <= new_size[0] && size[1] <= new_size[1]) return

			const tmp = this.canvas_make(canvas.size())
			tmp.d2.drawImage(canvas.native, 0, 0)

			canvas.size(new_size)

			canvas.d2.drawImage(tmp.native, 0, 0, new_size[0], new_size[1])
		}

		@ $mol_action
		protected prepare() {
			const canvas = this.canvas()
			const node = this.node()
			const [w, h] = $yuf_media_size(this.node())

			canvas.size([w, h])
			canvas.d2.fillStyle = 'rgb(255, 255, 255)'
			canvas.d2.fillRect(0, 0, w, h)
			canvas.d2.drawImage(node, 0, 0, w, h)
		}

		@ $mol_mem_key
		blob(transforms: (readonly ($yuf_canvas_blob_op<this, 'crop' | 'resize'>)[]) | null) {
			this.deps()
			if (! transforms) transforms = [ { copy: {} } as NonNullable<typeof transforms>[0] ]
			return $mol_wire_sync(this).blob_async(transforms)
		}

	}
}
