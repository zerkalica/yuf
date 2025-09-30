namespace $.$$ {
	export class $yuf_login_form_demo extends $.$yuf_login_form_demo {
		
		override enter(e?: Event) {
			this.$.$mol_wait_timeout(1000)
			console.log('Logged:', this.login(), this.password())
		}

	}
}
