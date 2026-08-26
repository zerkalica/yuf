namespace $ {
	export class $yuf_sj_jammer_rule_store_mock extends $yuf_sj_jammer_rule_store {
		max_rules() { return 20 }
		pick_ids() {
			const result = [] as string[]
			const at = this.access_type().at(0) ?? ''
			for (let i = 0; i < this.max_rules(); i++) {
				result.push(at + (i + 1) )
			}

			return result as ReturnType<this['defaults']>
		}

		override mock(next?: ReturnType<this['defaults']> | null) {
			if (next === null) return [] as ReturnType<this['defaults']>
			return next ?? this.pick_ids()
		}

	}
}

