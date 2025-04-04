namespace $ {
	
	class timeout_promise extends $mol_promise<void> {
		task: $mol_after_timeout | undefined | null

		succcess() {
			this.task = null
			this.done()
		}

		destructor() {
			this.task?.destructor()
			this.task = null
		}
	}

	export function $yuf_wait_timeout_async( this: $, timeout: number ): Promise< void > {
		const promise = new timeout_promise()

		promise.task = new this.$mol_after_timeout( timeout , ()=> promise.succcess())

		return promise
	}

	export class $yuf_wait_timeout_wrap extends $mol_object {
		constructor(readonly timeout: number) {
			super()
		}

		destructor() {
			this.promise?.destructor()
		}

		protected promise: timeout_promise | null = null

		wait() {
			if (this.promise && ! this.promise.task) return
			this.promise?.destructor()
			this.promise = this.$.$yuf_wait_timeout_async(this.timeout) as timeout_promise
			$mol_fail_hidden(this.promise)
		}

		@ $mol_action
		static timeout(timeout: number) {
			return new $yuf_wait_timeout_wrap(timeout)
		}

	}

	export function $yuf_wait_timeout( this: $, timeout: number ) {
		return this.$yuf_wait_timeout_wrap.timeout(timeout).wait()
	}
	
}
