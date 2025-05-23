namespace $ {

	export class $yuf_url_object extends $mol_object {
		constructor(
			readonly blob: Blob,
			readonly url = URL.createObjectURL(blob)
		) { super() }

		@ $mol_mem_key
		static from_blob(blob: Blob) { return new this(blob) }

		toString() { return this.url }

		destructor() { URL.revokeObjectURL(this.url) }
	}

}
