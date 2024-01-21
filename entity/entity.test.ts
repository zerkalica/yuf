namespace $.$$ {
	$mol_test({
		'user test'( $ ) {
			const talent_dig = $.$nxr_entity_test_talent.add({
				id: 't1',
				title: 'dig',
				amount: 5,
			})
			$mol_assert_equal(talent_dig.amount(), 5)
		
			const talent_fly = $.$nxr_entity_test_talent.add({
				id: 't2',
				title: 'fly',
				amount: 15,
			})
			$mol_assert_equal(talent_fly.amount(), 15)
		
			const user = $.$nxr_entity_test_user.add({
				id: 'u1',
				name: '1',
				age: 22,
				talent_ids: [ 't1' ]
			})

			const ids_full = $.$nxr_entity_test_user.search({ })
			$mol_assert_equal(ids_full, [ 'u1' ] )
			$mol_assert_equal(user.talent_ids(), [ 't1' ])
		
			user.talent_add('t2')
			$mol_assert_equal(user.talent_ids(), [ 't1', 't2' ])
			user.talent_remove('t1')
			$mol_assert_equal(user.talent_ids(), [ 't2' ])
		
			$.$nxr_entity_test_user.remove('u1')

			const ids_empty = $.$nxr_entity_test_user.search({ })

			$mol_assert_equal(ids_empty, [])
			$.$nxr_entity_test_talent.remove('t2')
		}
	})
}

