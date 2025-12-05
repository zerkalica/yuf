namespace $ {

	export function $yuf_error_fallback<Result>(
		task: () => Result,
		{ loading, error }: {
			loading?: Result | undefined
			error?: Result | undefined
		}
	) {
		try {
			return task()
		} catch (e) {
			const result = $mol_promise_like(e) ? loading : error
			if (result === undefined) $mol_fail_hidden(e)
			$mol_fail_log(e)
			return result
		}
	}

}
