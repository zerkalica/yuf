namespace $ {

	const contexts = new WeakMap<{}, WeakMap<{}, $mol_object>>()

	export class $yuf_object extends $mol_object {

		static _< This extends typeof $mol_object >(this: This, $: {}) {
			let cache = contexts.get($)
			if (! cache) {
				cache = new WeakMap()
				contexts.set($, cache)
			}

			let instance = cache.get(this)

			if (! instance) {
				instance = new this()
				instance.$ = $ as $
				cache.set(this, instance)
			}

			return instance as InstanceType<This>
		}
	}

}
