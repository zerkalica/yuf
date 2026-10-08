namespace $ {
	export function $yuf_oids_user_error_pick(cause: unknown) {
		return cause && typeof cause === 'object'
			? cause as { user_data?: typeof $yuf_oids_user_model_dto.Value }
			: null
	}

}
