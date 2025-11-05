namespace $ {
	export function $yuf_error_fence<Data>(
		cb: () => Data,
		catcher: (parent: Error) => Error
	) {
		try {
			return cb()
		} catch (e) {
			if (! (e instanceof Error) ) $mol_fail_hidden(e)

			e = catcher(e)

			$mol_fail_hidden(e)
		}
	}
}
