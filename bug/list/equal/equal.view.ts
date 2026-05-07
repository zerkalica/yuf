namespace $.$$ {
	export class $yuf_bug_list_equal extends $.$yuf_bug_list_equal {
		@ $mol_mem
		logs() {
			return this.make_rows(30)
		}

		@ $mol_mem
		logs_sorted() {
			this.$.$mol_wait_timeout(50)
			return this.reversed() ? this.logs().toReversed() : this.logs()
		}

		make_rows(count = 1) {
			const result = [] as string[]
			let str_len = Number(this.$.$mol_state_arg.value('str_len') || 0) || 100
			if (Number.isNaN(str_len)) str_len = 100
			for (let i = 0; i < count; i++) {
				result.push(new Date().toISOString() + ': ' + $mol_stub_message(str_len) + i)
			}
			return result
		}

		@ $mol_mem
		indices() {
			return this.logs_sorted().map((_, index) => index)
		}

		@ $mol_mem
		override rows() {
			return this.indices().map((index) => this.Item(index))
		}

		log_row(index: number) {
			return this.logs_sorted()[index]
		}

	}
}
