namespace $ {
	export function $yuf_error_status<Result>(
		cb: () => Result,
		update_status: (e: readonly [Error | Promise<unknown>] | null) => void
	) {
		try {
			const res = cb()
			update_status(null)
			return res
		} catch (e) {
			Promise.resolve().then( ()=> update_status([ e as any ]) )
			if ($mol_promise_like(e)) $mol_fail_hidden(e)
			$mol_fail_log(e)
			return null
		}
	}
}
