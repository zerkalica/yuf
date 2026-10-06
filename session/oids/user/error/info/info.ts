namespace $ {
	export function $yuf_session_oids_user_error_info(e: Error) {
		const sub_error = e instanceof AggregateError ? e.errors?.[0] as Error : null
		return {
			... $yuf_session_oids_error_pick_field(sub_error?.cause),
			... $yuf_session_oids_user_error_pick(e.cause),
			message: sub_error?.message ?? e.message,
		}
	}

}
