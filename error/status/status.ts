namespace $ {
	export type $yuf_error_status_val = [Error | Promise<unknown>] | null

	export function $yuf_error_status<Result>(
		cb: () => Result,
		update_status: (e: $yuf_error_status_val) => void
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

	export function $yuf_error_status_error(this: $, status: $yuf_error_status_val) {
		const err = status?.[0]
		if (! err ) return ''
		if ($mol_promise_like(err)) $mol_fail_hidden(err)
		return this.$mol_error_message(err)
	}
}
