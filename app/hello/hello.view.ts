namespace $.$$ {
	export class $yuf_app_hello extends $.$yuf_app_hello {
		@ $mol_mem
		logs(next?: readonly string[]): readonly string[] {
			const prev = $mol_wire_probe(() => this.logs()) ?? []
			return [ ...next ?? [], ...prev ]
		}

		@ $mol_mem
		log_add() {
			this.logs([ new Date().toISOString() + ': ' + $mol_stub_message(500) ])
			this.$.$mol_state_time.now(200)
			return null
		}

		@ $mol_mem
		override rows() {
			return this.logs().map((_, i) => this.Log(i))
		}

		log_row(index: number) {
			return this.logs()[index]
		}

		auto() {
			this.log_add()
		}

	}
}
