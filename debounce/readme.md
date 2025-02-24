# $yuf_debounce

Simple debounce for mol.

Example:

```ts
		class my_model extends $mol_object {
			data(next?: { some: string }) {
				return next ?? null
			}

			timeout() { return 200 }

			@ $mol_mem
			debounce() {
				return this.$.$yuf_debounce.make<typeof $yuf_debounce<ReturnType<typeof this.data>>>({
					data: () => this.data(),
					timeout: () => this.timeout()
				})
			}

			debounced() {
				return this.debounce().debounced()
			}
		}
```
