namespace $ {
	export class $yuf_promise<Result> extends $mol_promise<Result> {
		protected _value = undefined as undefined | Result | Error
		protected _timer = null as null | $mol_after_timeout

		deadline(deadline = 30_000, error = new Error('Timeout')) {
			this._timer = new $mol_after_timeout(deadline, () => this.value(error))
		}

		value(next?: Result | Error) {
			if (next === undefined) {
				if (this._value === undefined) $mol_fail_hidden(this.catch(e => null))
				return this._value
			}

			this._timer?.destructor()
			this._timer = null

			this._value = next
			if (next instanceof Error) return this.fail(next)
			this.done(next)
			return this._value
		}

	}
}
