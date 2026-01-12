namespace $ {
	export class $yuf_karaoke_store_mock extends $yuf_karaoke_store {
		override mock( next?: readonly string[] | null ) {
			if (next) return next

			const result = [] as string[]
			for (let i = 1; i <= 100; i++) {
				result.push(String(i))
			}

			return result
		}
	}
}
