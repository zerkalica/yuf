namespace $.$$ {
	export class $yuf_drop_list_demo extends $.$yuf_drop_list_demo {
		override pages() {
			return this.hided() ? [] : super.pages()
		}

		@ $mol_mem
		override toggling_task() {
			if (! this.toggling()) return null

			const val = this.count(this.count() + 1)
			$mol_state_time.now((val % this.every_count_wait()) === 0 ? this.long_wait() : this.short_wait())
			this.hided(! this.hided())
			return null
		}

		override toggling_title() {
			return super.toggling_title().replace('{count}', this.count().toFixed(0))
		}

		@ $mol_mem
		override count_msg() {
			return (this.count() % (this.every_count_wait() - 1)) === 0 ? this.waiting() : this.count().toFixed(0)
		}
	}

	export class $yuf_drop_list_demo_catalog extends $.$yuf_drop_list_demo_catalog {
		@ $mol_mem
		override ids_actual(next?: readonly string[]) {
			if (next !== undefined) {
				this.$.$mol_wait_timeout(500)
				if (this.errors_on()) throw new Error('Fake error bla bla blablalbla some error')
				return next
			}

			const result = []

			const max = this.items_max()

			for (let i = 0; i < max; i++) result.push(`Item № ${i}`)

			return result
		}

		override id(id: string) { return id }
	}

	export class $yuf_drop_list_demo_catalog_item extends $.$yuf_drop_list_demo_catalog_item {
	}
}
