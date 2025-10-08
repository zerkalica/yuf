namespace $.$$ {
	export class $yuf_app_hello extends $.$yuf_app_hello {
		@ $mol_mem
		logs(next?: readonly string[]): readonly string[] {
			const prev = $mol_wire_probe(() => this.logs()) ?? this.make_rows(50)
			return [ ...next ?? [], ...prev ]
		}

		make_rows(count = 1) {
			const result = [] as string[]
			for (let i = 0; i < count; i++) {
				result.push(new Date().toISOString() + ': ' + $mol_stub_message(500) + i)
			}
			return result
		}

		@ $mol_mem
		log_add() {
			this.logs(this.make_rows(1))
			let ms = Number(this.$.$mol_state_arg.value('log_delay') || 0) || 1000
			if (Number.isNaN(ms)) ms = 1000
			this.$.$mol_state_time.now(ms)
			return null
		}

		@ $mol_mem
		override rows() {
			return this.logs().map(_ => this.Log(_))
		}

		log_row(val: string) {
			return val
		}

		auto() {
			this.log_add()
		}

	}
}
