namespace $.$$ {
	

	$mol_test({
		async 'list reorder async'( $ ) {
			class Test extends $mol_object {
				@ $mol_mem_key
				static app($: $) {
					const test = new Test
					test.$ = this.$
					return test
				}

				@ $mol_mem
				list() {
					const app = this.$.$yuf_bug_list_push.make({})
					return app
				}

				titles_snap() {
					return this.list().rows().map(el => el.title())
				}
			}

			const app = Test.app($)
			const list = app.list()

			const prev_titles = app.titles_snap()
			const prev_ids = list.ids_actual()

			list.move(null)

			await $mol_wire_async(list).status()

			const next_ids = list.ids_actual()

			$mol_assert_equal(prev_ids[1], next_ids[2]) // passed

			const next_titles = app.titles_snap()
			$mol_assert_equal(prev_titles[1], next_titles[2]) // passed, but bug still here

		} ,
	})
}
