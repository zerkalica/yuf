namespace $ {

	// Shallow diff two objects by key order insensitive
	// @returns differ keys
	export function $yuf_object_diff<Obj extends {}>(next: Obj, prev = next) {
		const keys = Object.keys(prev) as (keyof Obj)[]

		const settings_keys = Object.keys(next).filter(key =>
			! (key in prev)
			&& next[key as keyof typeof next] !== undefined
		)

		// mol_compare_deep key order sensitive
		return [...keys, ...settings_keys].filter(key => ! $mol_compare_deep(
			next[key as keyof typeof next],
			prev[key as keyof typeof prev] as any,
		)) as readonly (keyof Obj)[]
	}
}
