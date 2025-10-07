namespace $ {
	const cache = new WeakMap<Object, Map<PropertyKey, Function>>()

	function error_message(some: unknown, obj: unknown) {
		return `${String(obj ?? 'unk')} - ${String(some ?? 'unk')}`
	}

	function $yuf_error_safe_prop<Host, Args extends unknown[]>( this: Host, val: (this: Host, ...args: Args) => unknown, ...args: Args ) {
		try {
			let result = val.call(this, ...args)

			if ($mol_promise_like(result)) {
				result = result.catch(
					err => err instanceof Error ?
						err :
						new Error(error_message(err, this), { cause: err })
				)
			}
			return result
		} catch (e) {
			if (! $mol_promise_like(e) && ! (e instanceof Error)) {
				e = new Error(error_message(e, this), { cause: e })
			}

			$mol_fail_hidden(e)
		}
	}

	/**
	 * Wraps each method of object
	 * And converts non-Error exceptions to Error instance
	 */
	export function $yuf_error_safe< Host extends object >( obj: Host ) {
		return new Proxy( obj, {

			get( obj, field ) {
				
				const val = (obj as any)[ field ]
				if( typeof val !== 'function' ) return val
				let methods = cache.get(obj)
				if (! methods) cache.set(obj, methods = new Map())

				let patched = methods.get(field)
				if (! patched) methods.set(field, patched = $yuf_error_safe_prop.bind(obj, val))

				return patched
			},

			apply( obj, self, args ) {
				return $yuf_error_safe_prop.call(obj, self, ...args)
			}
		} )
	}
}
