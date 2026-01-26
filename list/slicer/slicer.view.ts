namespace $.$$ {
	export class $yuf_list_slicer extends $.$yuf_list_slicer {

		@ $mol_mem
		override rows() {
			return this.$.$mol_range2(index => this.Row(index), () => this.rows_size())
		}

		@ $mol_mem
		rows_size() {
			return Math.ceil(this.items().length / this.items_per_row())
		}

		override row_items(row_index: number) {
			const items_per_row = this.items_per_row()
			const from = row_index * items_per_row
			const items = this.items()
			const chunk = items.slice(from, from + items_per_row)

			const empty_count = items_per_row - chunk.length
			if (empty_count > 0 && from > 0) {
				chunk.push(this.Placeholder(empty_count))
			}

			return chunk
		}

		override placeholder_width(empty_count: number) {
			const item_width = this.first_visible_card()?.view_rect()?.width || 1
			return `${(empty_count * item_width).toFixed(2)}px`
		}

		@ $mol_mem
		width() {
			const rect = this.view_rect()
			return rect?.width ?? 0
		}

		@ $mol_mem
		first_visible_card() {
			const [ from, to ] = this.view_window()
			return this.row_items(from).at(0) ?? null
		}

		override item_height_min(id: string) {
			return this.card_minimal_height()
		}

		override item_width_min(id: string) {
			return this.card_minimal_width()
		}

		@ $mol_mem
		override card_minimal_width() {
			return this.items().at(0)?.minimal_width() || super.card_minimal_width()
		}

		@ $mol_mem
		override card_minimal_height() {
			return this.items().at(0)?.minimal_height() || super.card_minimal_height()
		}

		@ $mol_mem
		items_per_row_sync() {
			const list_width = this.width()
			const item_width = this.card_minimal_width()
			if (! item_width || ! list_width) return null

			const items_per_row = Math.max(1, Math.floor(list_width / item_width))

			new $mol_after_frame(() => this.items_per_row(items_per_row))

			return null
		}

		auto() {
			super.auto()
			this.items_per_row_sync()
		}
		
	}
}
