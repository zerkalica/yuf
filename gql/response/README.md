# $yuf_gql_response

Transformer converts http response to gql data or throws exception with response in cause if error found in json.

```ts
	const rec = $mol_data_record
	const opt = $mol_data_optional
	const nul = $mol_data_nullable
	const str = $mol_data_string
	const num = $mol_data_number
	const arr = $mol_data_array
	const bool = $mol_data_boolean

	const gql = $yuf_gql_response

	const user_sessions_request_dto = gql(rec({
		user_sessions: opt(nul(arr(rec({
			user_id: nul(str)
		}))))
	}))
```
