namespace $ {

	export class $yuf_fflate extends $mol_object {
		@ $mol_mem
		protected static module() {
			$mol_wire_solid()
			return this.$.$mol_import.script('yuf/fflate/.npm/-/app.js').$yuf_fflate_npm as typeof import('./.npm/.app')
		}

		static unzip(...args: Parameters<ReturnType<typeof this.module>['unzipSync']>) {
			return this.module().unzipSync(...args)
		}

		static zip(...args: Parameters<ReturnType<typeof this.module>['zipSync']>) {
			return this.module().zipSync(...args)
		}

		protected fflate() { return this.$.$mol_static.$yuf_fflate }

		data() { return new Uint8Array() }

		@ $mol_mem
		protected files() {
			$mol_wire_solid()

			const bin = this.data()
			const files = this.fflate().unzip(bin)

			return files
		}

		@ $mol_mem
		names() { return Object.keys(this.files()) }

		@ $mol_mem_key
		file(name: string) {
			$mol_wire_solid()
			const files = this.files()

			const data = files[name]
			if (! data) throw new Error('File not found in zip', { cause: { name } })

			return data
		}

		@ $mol_mem_key
		text(name: string) {
			$mol_wire_solid()
			const template_buf = this.file(name)

			return this.$.$mol_charset_decode(template_buf)
		}
	}
}
