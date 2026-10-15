namespace $.$$ {
	export class $yuf_bug_search extends $.$yuf_bug_search {
		
		@ $mol_mem
		override text() {
			const result = []
			const max = this.max_rows() - 1
			for (let i = 0; i <= max; i++) {
				result.push(i === max ? `
| . |
| . |
| mix |
| . |
` : '| . |')
			}
			return result.join('\n')
		}
		
	}
}
