namespace $ {
	$mol_test({
		'lru add'() {
			let ids = [] as readonly string[]

			const lru = $yuf_lru.make({
				ids: next => ids = (next ?? ids),
				remove: k => {
					ids = ids.filter(src => src !== k)
				},
				size: () => 1,
				max: () => 3,
			})

			lru.add('1')
			lru.add('2')
			lru.add('3')

			$mol_assert_equal(
				ids,
				['1', '2', '3']
			)

			lru.add('4')

			$mol_assert_equal(
				ids,
				['2', '3', '4']
			)

			lru.add('5')
			lru.add('6')

			$mol_assert_equal(
				ids,
				['4', '5', '6']
			)

			lru.add('5')
			lru.add('5')

			$mol_assert_equal(
				ids,
				['4', '6', '5']
			)

			lru.add('1')

			$mol_assert_equal(
				ids,
				['6', '5', '1']
			)
		},
	})
}
