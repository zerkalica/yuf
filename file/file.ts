namespace $ {
	export class $yuf_file extends $mol_object {
		constructor(readonly native: File) { super() }

		@ $mol_mem_key
		static from_file(file: File) { return new this(file) }

		size() { return this.native.size }
		name() { return this.native.name }
	 	ext() { return this.name().match('\.([^.]+)$')?.[1] ?? '' }
		type() { return this.native.type }

		object_url() { return this.$.$yuf_url_object.from_blob(this.native).url }

		@ $mol_mem
		bytes() {
			return new Uint8Array($mol_wire_sync(this.native).arrayBuffer())
		}

		@ $mol_mem
		blob() {
			return new Blob([ this.bytes() ])
		}

		@ $mol_mem_key
		checksum(algo: 'SHA-384' | 'SHA-512' | 'SHA-256' | 'SHA-1') {
			const data = this.bytes()
			const hash_buf = $mol_wire_sync(this.$.$mol_crypto_native.subtle).digest( algo, data )

			return Array.from(
				new Uint8Array(hash_buf),
				byte => byte.toString(16).padStart(2, '0')
			).join('')
		}
	}
}
