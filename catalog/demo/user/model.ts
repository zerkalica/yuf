namespace $ {
	export class $yuf_catalog_demo_user_model extends $mol_object {
		id() { return '' }

		@ $mol_mem
		name() {
			return $mol_stub_person_name()
		}

		@ $mol_mem
		age() {
			return Math.ceil(5 + Math.random() * 70 )
		}
	}
}
