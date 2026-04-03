namespace $ {
	export function $yuf_template_urls(
		this: $,
		text: string,
		files: Record<string, Uint8Array>,
		text_extensions = ['css', 'html'],
		cache = {} as Record<string, string>
	): string {
		const str = Object.keys(files).map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
		const file_regexp = new RegExp(`(?:(?:\.\/)|["'(\s])(${str})\\b`, 'g')

		const data_url = (name: string) => {
			if (cache[name]) return cache[name]

			const ext = name.match(/\.([^\.\/]+)$/)?.[1] ?? ''

			const data = text_extensions.includes(ext)
				? this.$yuf_template_urls(this.$.$mol_charset_decode(files[name]), files, text_extensions, cache)
				: files[name]

			const type = this.$.$mol_file_extensions[ext] || 'application/octet-stream'
			const blob = new Blob([ data as Uint8Array<ArrayBuffer> | string ], { type })

			return cache[name] = this.$.$yuf_url_object.from_blob(blob).toString()
		}

		return text.replace(file_regexp, (_, url) => data_url(url))
	}
}
