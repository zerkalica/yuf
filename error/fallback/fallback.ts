namespace $ {

	export function $yuf_error_fallback<V>(cb: () => V, prev?: V | undefined) {
		try {
			return cb()
		} catch (e) {
			if ($mol_promise_like(e) && prev) return prev
			$mol_fail_hidden(e)
		}
	}

}
