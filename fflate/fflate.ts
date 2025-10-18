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

	}
}
