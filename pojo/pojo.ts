namespace $ {
	const called = new WeakSet<{}>()

	export type $yuf_pojo_options = {
		include_stack?: boolean
		hidden_props?: RegExp
	}

	export const $yuf_pojo_serializers = new Map<Function, (val: any, options: $yuf_pojo_options) => unknown>([
		[$mol_fetch_request, parse_mol_request],
		[$mol_fetch_response, parse_mol_response],
		[Request, parse_request],
		[Response, parse_response],
		[Headers, parse_entries],
		[Error, parse_error],
		[Map, parse_entries],
		[Set, parse_set],
	])

	export function $yuf_pojo(e: unknown, options: $yuf_pojo_options = {}): any {
		if (typeof e === 'symbol' || typeof e === 'function') return e.toString()
		if (! e || typeof e !== 'object') return e
		if (called.has(e)) return undefined

		called.add(e)

		try {
			if ('toJSON' in e && typeof e.toJSON === 'function') return parse_pojo(e.toJSON(), options)

			for (const [Klass, serializer] of $yuf_pojo_serializers.entries()) {
				if (e instanceof Klass) return serializer(e, options)
			}

			if ( ArrayBuffer.isView( e ) ) return `Buffer(${e.byteLength})`
			if (Array.isArray(e)) return parse_array(e, options)
			if (Symbol.iterator in e) return parse_iterable(e as Iterable<unknown>, options)

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

	function parse_primitive(e: {}, options: $yuf_pojo_options) {
		return (e as any)[ Symbol.toPrimitive ]( 'default' )
	}

	function parse_pojo(obj: Object, options: $yuf_pojo_options) {
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

			const normalized = $yuf_pojo(val, options)
			if (normalized === undefined) continue

			result[key] = normalized
		}

		return result
	}

	function parse_set(e: Set<unknown>, options: $yuf_pojo_options) {
		return $yuf_pojo(Array.from(e.values()), options)
	}

	function parse_iterable(e: Iterable<unknown>, options: $yuf_pojo_options) {
		return $yuf_pojo(Array.from(e), options)
	}

	function parse_array(arr: readonly unknown[], options: $yuf_pojo_options) {
		if (! arr.length) return undefined
		return arr.map(item => $yuf_pojo(item, options))
	}

	function parse_error(e: Error, options: $yuf_pojo_options) {
		return $yuf_pojo({
			message: e.message,
			name: e.name === 'Error' || e.name === 'AggregateError' ? undefined : e.name,
			cause: $yuf_pojo(e.cause, options),
			errors: e instanceof AggregateError ? $yuf_pojo(e.errors, options) : undefined,
			stack: options.include_stack ? e.stack : undefined,
		}, options)
	}

	function parse_entries(headers: Headers | Map<any, any>, options: $yuf_pojo_options) {
		return $yuf_pojo(Object.fromEntries(headers), options)
	}

	function parse_request(request: Request, options: $yuf_pojo_options) {
		return $yuf_pojo({
			url: request.url,
			method: request.method === 'GET' ? undefined : request.method,
			referrer: request.referrer,
			headers: $yuf_pojo(request.headers, options),
		}, options)
	}

	function parse_response(response: Response, options: $yuf_pojo_options) {
		return $yuf_pojo({
			url: response.url || undefined,
			type: response.type === 'default' ? undefined : response.type,
			status: response.status,
			statusText: response.statusText || undefined,
			headers: $yuf_pojo(response.headers, options),
		}, options)
	}

	function parse_mol_request(request: $mol_fetch_request, options: $yuf_pojo_options) {
		return $yuf_pojo(request.native, options)
	}

	function parse_mol_response(response: $mol_fetch_response, options: $yuf_pojo_options) {
		return {
			request: $yuf_pojo(response.request, options),
			response: $yuf_pojo(response.native, options),
		}
	}

}
