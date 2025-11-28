namespace $ {
	const called = new WeakSet<{}>()

	type Options = {
		include_stack?: boolean
		hidden_props?: RegExp
	}

	export function $yuf_error_json(e: unknown, options: Options = {}): any {
		if (typeof e === 'symbol' || typeof e === 'function') return e.toString()
		if (! e || typeof e !== 'object') return e
		if (called.has(e)) return undefined

		called.add(e)

		try {
			if ('toJSON' in e && typeof e.toJSON === 'function') return parse_pojo(e.toJSON(), options)
			if ( ArrayBuffer.isView( e ) ) return '<Buffer>'
			if (Array.isArray(e)) return parse_array(e, options)

			if (e instanceof Set) return parse_array(Array.from(e.values()), options)
			if (e instanceof Map) return parse_entries(e, options)

			if (e instanceof Error) return parse_error(e, options)

			if (e instanceof $mol_fetch_request) return parse_mol_request(e, options)
			if (e instanceof $mol_fetch_response) return parse_mol_response(e, options)
			if (e instanceof Request) return parse_request(e, options)
			if (e instanceof Response) return parse_response(e, options)
			if (e instanceof Headers) return parse_entries(e, options)

			if (Symbol.iterator in e) return parse_array(Array.from(e as any), options)

			const proto = Reflect.getPrototypeOf(e)
			if( ! proto || ! Reflect.getPrototypeOf(proto) ) return parse_pojo(e, options)

			if (Symbol.toPrimitive in e) return parse_primitive(e, options)

			return undefined
		} catch(err) {
			const message = typeof err === 'object' && err && 'message' in err ? err.message as string : ''
			return `Serialize_error(${message})`
		} finally {
			called.delete(e)
		}
	}

	function parse_primitive(e: {}, options: Options) {
		return (e as any)[ Symbol.toPrimitive ]( 'default' )
	}

	function parse_pojo(obj: Object, options: Options) {
		const keys = Object.keys(obj)
		if (! keys.length) return undefined

		const result = {} as Record<string, unknown>

		for (const key of keys) {
			const val = obj[key as keyof typeof obj]
			if (
				(typeof val === 'string' || typeof val === 'number')
				&& options.hidden_props
				&& key.match(options.hidden_props)
			) {
				result[key] = '*'
				continue
			}

			const normalized = $yuf_error_json(val, options)
			if (normalized === undefined) continue

			result[key] = normalized
		}

		return result
	}

	function parse_array(arr: readonly unknown[], options: Options) {
		if (! arr.length) return undefined
		return arr.map(item => $yuf_error_json(item, options))
	}

	function parse_error(e: Error, options: Options) {
		return $yuf_error_json({
			message: e.message,
			name: e.name === 'Error' || e.name === 'AggregateError' ? undefined : e.name,
			cause: $yuf_error_json(e.cause, options),
			errors: e instanceof AggregateError ? $yuf_error_json(e.errors, options) : undefined,
			stack: options.include_stack ? e.stack : undefined,
		}, options)
	}

	function parse_entries(headers: Headers | Map<any, any>, options: Options) {
		return $yuf_error_json(Object.fromEntries(headers), options)
	}

	function parse_request(request: Request, options: Options) {
		return $yuf_error_json({
			url: request.url,
			method: request.method === 'GET' ? undefined : request.method,
			referrer: request.referrer,
			headers: $yuf_error_json(request.headers, options),
		}, options)
	}

	function parse_response(response: Response, options: Options) {
		return $yuf_error_json({
			url: response.url || undefined,
			type: response.type === 'default' ? undefined : response.type,
			status: response.status,
			statusText: response.statusText || undefined,
			headers: $yuf_error_json(response.headers, options),
		}, options)
	}

	function parse_mol_request(request: $mol_fetch_request, options: Options) {
		return $yuf_error_json(request.native, options)
	}

	function parse_mol_response(response: $mol_fetch_response, options: Options) {
		return {
			request: $yuf_error_json(response.request, options),
			response: $yuf_error_json(response.native, options),
		}
	}

}
