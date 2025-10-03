namespace $ {

	export class $yuf_entity2_promise<Result> extends $mol_promise<Result> {
		value = undefined as undefined | Result | Error

		constructor(
			executor?: (
				done: (value: Result | PromiseLike<Result>) => void,
				fail: (reason?: any) => void
			) => void,
			timeout = 10_000,
			timeout_error = new Error('Timeout deadline'),
			protected timer = new $mol_after_timeout(timeout, () => this.set(timeout_error)),
		) {
			super(executor)
		}


		set(next: Result | Error) {
			this.value = next
			this.timer.destructor()
			if (next instanceof Error) return this.fail(next)
			this.done(next)
		}
	}

}
