namespace $ {
	export class $yuf_frame extends $mol_object {

		src() { return 'about:blank' }

		doc() {
			return this.$.$mol_dom_context.document
		}

		html() { return '' }

		permissions() {
			return [ 'allow-scripts', 'allow-same-origin', 'allow-modals' ]
		}

		@ $mol_mem
		native() {
			const src = this.src()
			const srcdoc = this.html()
			const doc = this.doc()

			const frame = doc.createElement( 'iframe' )
			frame.src = src
			frame.sandbox = this.permissions().join(' ')
			frame.style.display = 'none'
			frame.srcdoc = srcdoc

			return frame
		}

		native_async() {
			const frame = this.native()
			const src = this.src()
			const doc = this.doc()

			return new Promise<typeof frame>((done, fail) => {
				frame.onload = () => done(frame)
				frame.onerror = (event, source, lineno, colno, error) => {
					let err = typeof event === 'string'
						? new Error(event)
						: ( event as ErrorEvent ).error as (Error | undefined)

					if ( ! ( err instanceof Error ) ) err = new Error(error?.message ?? 'Load error', { cause: {
						src,
						event,
						source,
						lineno,
						colno,
						error,
					}})

					fail(err)
				}

				doc.body.appendChild(frame)

			})
		}

		protected window() { return this.attached().contentWindow! }

		@ $mol_action
		print() {
			$mol_wire_sync(this.window()).print()
			this.$.$mol_wait_timeout(1000)
		}

		override destructor() {
			$mol_wire_probe(() => this.attached() )?.remove()
		}

		@ $mol_mem
		attached() {
			return $mol_wire_sync(this).native_async()
		}

	}

}
