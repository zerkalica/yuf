namespace $ {
	export class $yuf_sequence<Result, Params extends unknown[]> extends $mol_object {
		protected cancel = null as null | (() => void )

		protected render_task = null as null | Promise<any>
		protected dead = false

		task(...args: Params) { return null as Result }

		async task_async(...args: Parameters<typeof this.task>) {
			let task

			this.dead = false
			this.cancel?.()

			do {
				task = this.render_task

				try {
					await task
				} catch {
					//
				}
				if (this.dead) return null
			} while (task !== this.render_task)

			const promise = $mol_wire_async(this).task(...args)
			this.render_task = $mol_promise_like(promise) ? promise : null
			return promise
		}

		result(...args: Parameters<typeof this.task>) { return $mol_wire_sync(this).task_async(...args) }

		override destructor() {
			this.dead = true
			this.cancel?.()
			this.render_task = null
		}
	}
}
