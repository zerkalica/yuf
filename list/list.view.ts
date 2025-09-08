namespace $.$$ {
	export class $yuf_list extends $.$yuf_list {
		
		@ $mol_mem
		override subscroll() {
			try {
				this.rows()
				const item = this.subscroll_target()
				if (! item) return null
				this.ensure_visible(item)
				this.subscroll_target(null)
			} catch (e) {
				if (! $mol_promise_like(e)) $mol_fail_log(e)
			}

			return null
		}

		ensure_visible_item(item: $mol_view) {
			
		}


	}
}
