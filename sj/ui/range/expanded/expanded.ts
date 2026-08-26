namespace $ {
	export function $yuf_sj_ui_range_expanded(bands: Record<string, readonly number[]>) {
		const limit = new $mol_vector_range(Infinity, -Infinity)
		for (const [min, max] of Object.values(bands)) {
			limit.min = Math.min(min, limit.min)
			limit.max = Math.max(max, limit.max)
		}
		return limit
	}
}
