namespace $.$$ {
	export class $yuf_keyboard_check extends $.$yuf_keyboard_check {
		
		@ $mol_mem
		override checked(next?: boolean) {
			const target = this.Target()
			const input = this.Input()

			if (next) this.Target(input)
			if (next === false) this.Target(null)

			return next ?? (target === input)
		}
		
	}
}
