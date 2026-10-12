namespace $ {
	let collecting = 0

	const tmp = new WeakMap<{}>()

	export function $yuf_draft_collecting<Data extends {}>(prev: Data, next: Partial<Data>) {
		if (next === null) return next
		const data = { ... tmp.get(prev), ...next }
		tmp.set(prev, data)
		if (collecting > 0) return
		return data
	}

	/**
	 * @example
	```ts
	type User_data = { name: string, age: number }
	class User extends $mol_object {
		id() { return '' }

		data(next?: Partial<User_data>): User_data {
			const url = `/user/${this.id()}`
			if (next === undefined) return User_data_from_response(this.response(url))

			const prev = $mol_wire_probe(() => this.data()) ?? {}
			next = $yuf_draft_collecting(prev, next)
			if (next === undefined) return prev

			const full = { ... prev, ...next } as User_data

			this.response('/user', { method: 'POST', body: JSON.stringify(full) })
			return full
		}
	}
	```
	*/
	export function $yuf_draft_transact( ... tasks: readonly (() => unknown)[] ) {
		if (! tasks.length) return
		if (tasks.length === 1) return tasks[0]()

		try {
			collecting++
			for (let i = 0; i < tasks.length - 1; i++) tasks[i]()
		} finally {
			collecting--
		}

		tasks[tasks.length - 1]()
	}

}
