namespace $ {
	type Transform_names<T> = {
		[K in keyof T]: T[K] extends (ctx: $yuf_canvas_host, param: infer Param) => any ? Param extends {} ? K : never : never
	}[keyof T]

	export type $yuf_canvas_pipe_transform<Src> = {
		[Key in Transform_names<Src>]?: Key extends keyof Src
			? Src[Key] extends (ctx: $yuf_canvas_host, param: infer Param) => any ? Param : never
			: never
	}
	export type $yuf_canvas_pipe_transforms<Src> = readonly $yuf_canvas_pipe_transform<Src>[]

	export class $yuf_canvas_pipe extends $mol_object {
		@ $mol_action
		crop( canvas: $yuf_canvas_host,  {
			lt: [left_top_x, left_top_y],
			rb: [right_bottom_x, right_bottom_y]
		}: {
			lt: readonly [number,  number]
			rb: readonly [number, number]
		} ) {
			const width = right_bottom_x - left_top_x
			const height = right_bottom_y - left_top_y

			const tmp = canvas.clone()

			canvas.size([width, height])
			canvas.d2.drawImage(tmp.native, left_top_x, left_top_y, width, height, 0, 0, width, height)
		}

		@ $mol_action
		resize( canvas: $yuf_canvas_host, { max }: {
			max: readonly [number, number]
		} ) {
			const size = canvas.size()
			if (size[0] <= max[0] && size[1] <= max[1]) return

			const tmp = canvas.clone()

			canvas.size(max)

			canvas.d2.drawImage(tmp.native, 0, 0, max[0], max[1])
		}

		image_type() { return 'image/png' }
		quality() { return .99 }

		// Reuse seq without pulling (blobs runs as action)
		protected _seq = null as null | $yuf_sequence<Blob, Parameters<typeof this.task>>

		protected seq() {
			if (this._seq) return this._seq

			return this._seq = this.$.$yuf_sequence.make<
				typeof $yuf_sequence<Blob, Parameters<typeof this.task> >
			>({
				task: (a, b) => this.task(a, b),
			})
		}

		// Reuse canvas, between task runs
		protected _canvas = null as null | $yuf_canvas_host

		@ $mol_action
		protected transform(
			src: $yuf_canvas_host_source,
			transforms?: $yuf_canvas_pipe_transforms<$yuf_canvas_pipe>
		) {
			// Reuse canvas
			let canvas = this._canvas = this.$.$yuf_canvas_host.from_source(src, this._canvas)

			for (const transform of transforms ?? []) {
				for (const method of Object.keys(transform) as ('crop' | 'resize')[]) {
					const next = this[method](canvas, transform[method] as any) as unknown
					if (next instanceof $yuf_canvas_host) this._canvas = canvas = next
				}
			}
			return canvas
		}

		// This task runs sequential
		protected task(
			src: $yuf_canvas_host_source,
			transforms?: $yuf_canvas_pipe_transforms<$yuf_canvas_pipe>
		) {
			const quality = this.quality()
			const type = this.image_type()
			const canvas = this.transform(src, transforms)

			return canvas.blob({ type, quality })
		}

		blob(...opts: Parameters<typeof this.task>) { return this.seq().result(...opts) ?? new Blob() }

	}
}
