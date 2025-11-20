namespace $.$$ {
	export class $yuf_bug_catalog_flash_catalog extends $.$yuf_bug_catalog_flash_catalog {
		@ $mol_memo.method
		ids() {
			const ids = [] as string[]

			for (let i = 0; i <= 25; i++) {
				ids.push($mol_guid())
			}

			return ids
		}

		@ $mol_action
		ids_get() {
			const val = Number(this.$.$mol_state_arg.value('ids_get_timeout') || 500)
			if (! Number.isNaN(val) && val) this.$.$mol_wait_timeout(val)
			
			const result = [] as string[]
			const ids = this.ids()
			const min = Math.floor(ids.length / 2)
			const max = min + Math.floor((ids.length - min) * Math.random())

			for (let i = 0; i < max; i++) {
				result.push(ids[Math.floor(Math.random() * ids.length)])
			}

			return result
		}

		@ $mol_mem
		override spread_ids(): string[] {
			const val = Number(this.$.$mol_state_arg.value('spread_ids_refresh_rate') || 1000)
			if (! Number.isNaN(val) && val) $mol_state_time.now(val)
			const prev = $mol_wire_probe(() => this.spread_ids())

			try {
				const ids = this.ids_get()
				return ids
			} catch (e) {
				if ($mol_promise_like(e) && prev) return prev
				$mol_fail_hidden(e)
			}
		}

		@ $mol_mem_key
		spread_title( id: string ) {
			return $mol_stub_message(300)
		}
	}
}
