namespace $ {
	export function $yuf_gql_response< Sub extends $mol_data_value >( sub : Sub ) {

		return $mol_data_setup( ( response : $mol_fetch_response ) => {
			let json, text, err

			try {
				text = response.text()
				try {
					json = JSON.parse(text)
				} catch (e) {}
				if (response.ok() && json.data !== undefined) return sub( json.data ) as ReturnType<Sub>
			} catch (e) {
				if ( $mol_promise_like(e)) $mol_fail_hidden(e)
				$mol_fail_log(e)
				if ( !(e instanceof SyntaxError) ) err = e as Error
			}
			json = json ?? { internal: { error: { message: text } } }

			const { code , message } = $yuf_gql_pick_error(json) ?? {
				message: err?.message ?? (response.ok() ? 'Unknown' : response.message())
			}

			const cause = { code, response, json }

			if (err) throw new $mol_error_mix(message, cause, err)
			throw new Error(message, { cause })

		} , sub )

	}
	
}
