namespace $.$$ {
	export class $yuf_oids_user_error_format extends $.$yuf_oids_user_error_format {
		
		override message(next: Error) {
			const cause = this.$.$yuf_oids_error_pick(next.cause)
			const errors = this.errors()
			let message = errors[next.message]

			if (! message && cause?.field) message = errors['error-field'].replace('{message}', next.message)
			else if (! message ) message = next.message || ''

			message = message.replace('{field}', cause?.field ?? '')

			if (cause?.errorMessage === 'error-invalid-length') {
				message = message.replace('{max}', cause.params?.[2]?.toFixed() ?? '')
			}

			return message
		}

	}
}
