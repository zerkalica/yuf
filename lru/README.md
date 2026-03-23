# LRU cache cleaner

```ts
class My {
	@ $mol_mem
	static lru() {
		return this.$.$yuf_lru.make({
			key: () => `${this}.lru().ids()`,
			max: () => 50_000, // 50 kb max
			size: key => this.$.$mol_state_local.native().getItem(key)?.length ?? 0,
			raw: (key, next) => this.$.$mol_state_local.value(key, next),
		})
	}

	static settings(id: string, next?: { some: string } | null) {
		return this.lru().value(`${this}.settings("${id}")`, next)
	}
}
```
