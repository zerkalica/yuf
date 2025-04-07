namespace $.$$ {

	class Runner extends $mol_object {

		arr = new Array(9).fill(0).map((v, i) => i)
	
		@ $mol_mem
		emulate_actions(reset?: null) {
			this.result_set(this.arr[0])
			this.arr.shift()

			return new $mol_after_timeout(100, () => {
				this.emulate_actions(null)
			})
		}

		@ $mol_action
		result_set(val: number) {
			this.result(val)
		}
	
		@ $mol_mem
		result(val?: number) {
			return val ?? 0
		}
	
		log(str: string) {

		}

		@ $mol_mem
		synced() {
			const r = this.result()
			this.$.$mol_wait_timeout_oneshot(500)
			this.log('fetch ' + r)
			this.$.$mol_wait_timeout_oneshot(1000)
			this.log('success ' + r)
			return 'success ' + r
		}

		@ $mol_mem
		logging() {
		   this.log('index ' + this.result())
		   this.log('synced ' + this.synced())
		}
	
	}
	
	export class $yuf_app_hello extends $.$yuf_app_hello {
		@ $mol_mem
		runner() {
			const r = Runner.make({
				log: str => this.log_add(str)
			})
			// $mol_wire_log.watch(() => r.synced())
			// $mol_wire_log.watch(() => r.result())
			return r
		}

		// @ $mol_action
		log_add(str: string) {
			console.log(str)
		}

		@ $mol_mem
		logs(next?: string[]) {
			return next ?? []
		}

		auto() {
			$mol_wire_log.active()
			this.runner().emulate_actions()
			try {
				this.runner().logging()
			} catch (e) {
				$mol_fail_log(e)
			}
		}

	}
}
