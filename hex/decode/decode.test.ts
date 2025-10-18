namespace $ {
	const png = new Uint8Array([ 0x1a, 0x0a, 0x00, 0x49, 0x48, 0x78, 0xda ])
	$mol_test({
		'hex decode string'() {
			$mol_assert_equal($yuf_hex_decode('1a0a00494878da'), png)
		},
	})
}
