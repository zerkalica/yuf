namespace $ {
	export class $yuf_timer extends $mol_object {
		@ $mol_mem_key
		static by_id(id: string) { return new this(id) }

		@ $mol_mem_key
		static used(id: string, next?: number | null) {
			return this.$.$mol_state_local.value(`${this}.used("${id}")`, next) ?? null
		}

		constructor(protected _id: string) { super() }

		factory() {
			return this.constructor as typeof $yuf_timer
		}

		id() { return this._id }

		@ $mol_action
		grab(next?: number | null) {
			return this.factory().used(this.id(), next) ?? 0
		}

		protected suspended() {
			return this.$.$yuf_browser_live.hidden()
		}

		@ $mol_mem
		start() {
			this.suspended()
			return Date.now() - this.grab()
		}

		@ $mol_mem
		used() {
			const now = this.suspended() ? undefined : this.$.$mol_state_time.now(1000)
			const delta = now ? now - this.start() : undefined
			const ms = this.grab(delta)

			return new $mol_time_duration(ms).normal
		}

	}
}
