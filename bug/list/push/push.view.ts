namespace $.$$ {
	export class $yuf_bug_list_push extends $.$yuf_bug_list_push {
		
		@ $mol_mem
		override ids_actual(next?: readonly string[]) {
			if (next !== undefined) {
				this.$.$mol_wait_timeout(50)
				return next
			}

			const result = []

			const max = this.items_max()

			for (let i = 0; i < max; i++) result.push(`Item_${i}`)

			return result
		}

		override rows() { return this.ids_actual().map(id => this.Log(id)) }
		override log_row(id: string) { return id }

		override move(e?: Event | null) {
			const prev = this.ids_actual()
			const moved = prev[1]
			let next = prev.toSpliced(1, 1) // remove Item 1
			next = next.toSpliced(2, 0, moved) // add Item 1 after Item 2
			this.ids_next(next)
		}

		@ $mol_mem
		status() {
			const ids_next = this.ids_next()
			if (! ids_next.length) return null
			this.ids_actual(ids_next)
			this.ids_next([])
			return null
		}
	}
}
