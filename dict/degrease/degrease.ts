namespace $ {
	export function $yuf_dict_degrease<Val>(dict: Record<PropertyKey, Val | null | undefined>) {
		for (let key in dict) {
			if (dict[key] == null) delete dict[key]
		}

		return dict as Record<PropertyKey, Val>
	}
}
