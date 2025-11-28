namespace $ {
	export function $yuf_gql_response< Sub extends $mol_data_value >( sub : Sub ) {

		return $mol_data_setup( ( response : $mol_fetch_response ) => {
			let json, text, err

			try {
				text = response.text()
				json = JSON.parse(text)
				if (json.data === undefined) throw new Error('Empty data', { cause: { json } })
				throw new Error('bla')
				if (response.ok()) return sub( json.data ) as ReturnType<Sub>
			} catch (e) {
				if ( $mol_promise_like(e)) $mol_fail_hidden(e)
				$mol_fail_log(e)
				json = json ?? { internal: { error: { message: text } } }
				if ( !(e instanceof SyntaxError) ) err = e as Error
			}

			const { code , message } = $yuf_gql_pick_error(json) ?? { code: err?.message ?? response.message() }
			const cause = { message, response, json }

			if (err) throw new $mol_error_mix(code, cause, err)
			throw new Error(code, { cause })

		} , sub )

	}
	
}
