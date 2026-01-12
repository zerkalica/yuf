namespace $.$$ {
	export class $yuf_karaoke_text extends $.$yuf_karaoke_text {
		@ $mol_mem
		protected data_raw() {
			return this.$.$mol_fetch.success(this.uri()).text()
		}

		@ $mol_mem
		protected data() {
			return this.$.$yuf_karaoke_syntax_parse(this.data_raw())
		}

		protected groups() { return this.data() }

		override group_content() {
			return this.groups().map((_, index) => this.Group(index))
		}

		override ids(group_index: number) {
			return this.groups()[group_index].map((_, row_index) => [group_index, row_index] as const)
		}

		@ $mol_mem_key
		override row_text([group_index, row_index]: [number, number]) {
			const row = this.groups()[group_index][row_index]
			return row.filter(token => typeof token === 'string').join('')
		}

		@ $mol_mem
		hilited_group_index_last() {
			return this.groups().findLastIndex((_, group) => this.hilited_length([group, 0]) > 0)
		}

		@ $mol_mem
		scroll_task() {
			const index = this.hilited_group_index_last()
			const group = index >= 0 ? this.Group(index) : null
			group && this.ensure_visible(group)
			return null
		}

		auto() {
			this.scroll_task()
			return super.auto()
		}

		override hilited_length([group_index, row_index]: [number, number]) {
			const time_current = this.time() * 1000
			const row = this.groups()[group_index][row_index]

			let pos = 0
			let prev_time = 0

			for (let i = 0; i < row.length; i++) {
				const val = row[i]
				let next_time = row[i + 1]

				if (typeof val === 'string') {
					const range_full = (typeof next_time === 'number' ? next_time : 0) - prev_time
					const range_part = time_current - prev_time
					const part = range_full > 0 ? range_part / range_full : 1
					pos += Math.min(val.length, Math.floor(val.length * part))
					continue
				}

				if (val >= time_current) {
					break
				}
				prev_time = val
			}

			return pos
		}
	}

	export class $yuf_karaoke_text_group extends $.$yuf_karaoke_text_group {
		override row_content() {
			return this.ids().map(id => this.Row(id))
		}
	}

	export class $yuf_karaoke_text_row extends $.$yuf_karaoke_text_row {
		override content() {
			const hilited_length = this.hilited_length()
			const text = this.text()
			return [ this.Hilited(), text.slice(hilited_length) ]
		}

		override hilited_prefix() {
			const hilited_length = this.hilited_length()

			return this.text().slice(0, hilited_length)
		}
	}

}
