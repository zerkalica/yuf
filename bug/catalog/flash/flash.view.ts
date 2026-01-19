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
		last_event2(e?: Event) {
			if (! e) return null
			new $mol_after_frame(this.body_scroll_top)
			return this.last_event(e)
		}

		body_scroll_top = $mol_wire_async(() => this.Menu().body_scroll_top(0))

		@ $mol_mem
		override spread_ids() {
			this.last_event()

			return this.ids_get()
		}

		@ $mol_memo.method
		spread_title( id: string ) {
			return $mol_stub_message(300)
		}

		@ $mol_action
		select_key(key?: 'prev' | 'next') {
			const ids = this.spread_ids_filtered()
			const id = this.spread()
			const index = ids.indexOf(id)
			const direction = key === 'prev' ? -1 : 1

			const next = Math.min(ids.length - 1, Math.max(0, index + direction))

			const id_next = this.spread(ids[next])

			const item = this.Menu_item(id_next)
			this.Menu_links().ensure_visible(item, 'nearest')
		}

	}
}
