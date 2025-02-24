namespace $ {
	export class $yuf_debounce<Value> extends $mol_object {
		timeout() { return 300 }

		@ $mol_mem
		data(): Value {
			throw new Error('implement')
		}

		@ $mol_mem
		protected task() {
			this.data()
			return new $mol_after_timeout(this.timeout(), () => this.refresh())
		}

		refresh() { this.debounced(null) }

		@ $mol_mem
		debounced(reset?: null): Value {
			this.task()

			const prev = reset === null ? null : $mol_wire_probe(() => this.debounced())

			return prev ?? this.data()
		}

	}
}
