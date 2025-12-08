namespace $ {
	const called = new WeakSet<{}>()

	export type $yuf_pojo_options = {
		include_stack?: boolean
		hidden_props?: RegExp
		unwrap_promise?: boolean
	}

	export const $yuf_pojo_serializers = new Map<Function, (val: any, options: $yuf_pojo_options) => unknown>([
		[$mol_fetch_request, parse_mol_request],
		[$mol_fetch_response, parse_mol_response],
		[Date, parse_date],
		[Event, parse_event],
		[Request, parse_request],
		[Response, parse_response],
		[Headers, parse_entries],
		[Error, parse_error],
		[Map, parse_entries],
		[Set, parse_set],
	])

	export const $yuf_pojo_known = new WeakMap<{}, unknown>()

	export function $yuf_pojo(e: unknown, options: $yuf_pojo_options = {}): any {
		if (typeof e === 'symbol' || typeof e === 'function') return e.toString()
		if (! e || typeof e !== 'object') return e
		if (called.has(e)) return undefined

		called.add(e)

		try {
			if ('toJSON' in e && typeof e.toJSON === 'function' && ! (e instanceof Date)) {
				return parse_pojo(e.toJSON(), options)
			}

			for (const [Klass, serializer] of $yuf_pojo_serializers.entries()) {
				if (e instanceof Klass) return serializer(e, options)
			}

			const mapped = $yuf_pojo_known.get(e)
			if (mapped) return $yuf_pojo(mapped, options)

			if ( ArrayBuffer.isView( e ) ) return `Buffer(${e.byteLength})`
			if (Array.isArray(e)) return parse_array(e, options)
			if (Symbol.iterator in e) return parse_iterable(e as Iterable<unknown>, options)

			const proto = Reflect.getPrototypeOf(e)
			if( ! proto || ! Reflect.getPrototypeOf(proto) ) return parse_pojo(e, options)

			if (Symbol.toPrimitive in e) return parse_primitive(e, options)

			if ('toString' in e) return e.toString().replace(/^\[object /i, `[${e.constructor.name} `)
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
		const name = e.name || e.constructor.name

		return $yuf_pojo({
			message: e.message,
			name: name === 'Error' || name === 'AggregateError' ? undefined : e.name,
			cause: e.cause,
			errors: e instanceof AggregateError ? e.errors : undefined,
			stack: options.include_stack ? (String(e.stack) || undefined) : undefined,
		}, options)
	}

	function parse_date(e: Date, options: $yuf_pojo_options) {
		return e.toISOString()
	}

	function parse_event(e: Event & Partial<ErrorEvent & CloseEvent>, options: $yuf_pojo_options) {
		return $yuf_pojo({
			event: e.type,
			code: e.code,
			reason: e.reason,
			clean: e.wasClean,
			message: e.message,
			col: e.colno,
			line: e.lineno,
			file: e.filename,
			error: e.error,
		}, options)
	}

	function parse_entries(headers: Headers | Map<any, any>, options: $yuf_pojo_options) {
		return $yuf_pojo(Object.fromEntries(headers), options)
	}

	function parse_request(request: Request, options: $yuf_pojo_options) {
		const mapped = $yuf_pojo_known.get(request)
		let body = $yuf_pojo(mapped, options)
		try {
			body = JSON.parse(body)
		} catch (e) {}

		return $yuf_pojo({
			method: request.method === 'GET' ? undefined : request.method,
			url: request.url,
			body,
			referrer: request.referrer === 'about:client' ? undefined : request.referrer || undefined,
			headers: request.headers,
		}, options)
	}

	function parse_response(response: Response, options: $yuf_pojo_options) {
		return $yuf_pojo({
			url: response.url || undefined,
			type: response.type === 'default' ? undefined : response.type,
			status: response.status,
			statusText: response.statusText || undefined,
			headers: response.headers,
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
