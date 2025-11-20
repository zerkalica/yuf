namespace $.$$ {
	export class $yuf_bug_catalog_flash_catalog extends $.$yuf_bug_catalog_flash_catalog {
		@ $mol_memo.method
		ids() {
			const ids = [] as string[]
			let val = Number(this.$.$mol_state_arg.value('ids_max') || 50)
			if (Number.isNaN(val) || ! val) val = 50

			for (let i = 0; i <= val; i++) {
				ids.push($mol_guid())
			}

			return ids
		}

		@ $mol_action
		ids_get() {
			const result = [] as string[]
			const ids = this.ids()
			const min = Math.floor(ids.length / 2)
			const max = min + Math.floor((ids.length - min) * Math.random())

			const indices = new Set<number>()
			for (let i = 0; i < max; i++) {
				let index

				do {
					index = Math.floor(Math.random() * ids.length)
				} while (indices.has(index))

				indices.add(index)

				result.push(ids[index])
			}

			return result
		}

		@ $mol_mem
		override spread_ids(): string[] {
			this.last_event()

			return this.ids_get()
		}

		@ $mol_memo.method
		spread_title( id: string ) {
			return $mol_stub_message(300)
		}
	}
}
