namespace $.$$ {
	export class $yuf_size_card extends $.$yuf_size_card {
		
		override size_msg() {
			const bytes = this.size()
			const suffix = this.suffix()
			let str = ''

			if (bytes < 1024) str = bytes.toFixed(0) + ' ' + suffix.b
			if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' ' + suffix.kb
			if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' ' + suffix.mb

			return (bytes / 1073741824).toFixed(1) + ' ' + suffix.gb
		}

	}
}
