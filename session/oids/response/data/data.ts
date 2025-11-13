namespace $ {
	export function $yuf_session_oids_response_data< Sub extends $mol_data_value >( sub : Sub ) {

		return $mol_data_setup( ( response : $mol_fetch_response ) => {
			let json, err
			try {
				json = response.json()
				if (response.ok()) return sub(json) as ReturnType<Sub>
			} catch (e) {
				if ( $mol_promise_like(e)) $mol_fail_hidden(e)
				$mol_fail_log(e)
				debugger
				err = e as Error
			}

			const err_obj = $yuf_session_oids_error_pick(json)
			const message = err_obj?.error_description
			const code = err_obj?.error || err?.message || response.message()

			const cause = { message, response, json }

			if (err) throw new $mol_error_mix(code, cause, err)
			throw new Error(code, { cause })

		} , sub )

	}
}
