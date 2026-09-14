namespace $.$$ {
	export class $yuf_avatar_name extends $.$yuf_avatar_name {
		
		override name_formatted() {
			return this.name_tpl().replace('{name}', this.name())
		}
		
		override login_formatted() {
			return this.login_tpl().replace('{login}', this.login())
		}

		
	}
}
