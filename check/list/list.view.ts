namespace $.$$ {
	export class $yuf_check_list extends $.$yuf_check_list {
		
		override checks() {
			return this.options().map(id => this.Item(id))
		}

		override item_title(id: string) {
			return this.dictionary()[id] || id
		}

		@ $mol_mem_key
		override item_checked(id: string, next?: boolean) {
			let next_arr

			if (next !== undefined) {
				next_arr = this.value().filter(src => src !== id)
				if (next) next_arr.push(id)
			}


			return this.value(next_arr).includes(id)
		}
		
	}
}
