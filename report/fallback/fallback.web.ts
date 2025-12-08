namespace $ {
	function report(event: Event | string, url?: string, line?: number, col?: number, error?: Error) {
		const time = new Date()
		const options = {
			hidden_props: /^(authorization|password)$/
		}

		const target = typeof event === 'string'
			? { event, error }
			: 'error' in event && event.error ? event.error : event

		let event_pojo
		try {
			event_pojo = $yuf_pojo(target, options)
		} catch (error) {
			event_pojo = { error, target }
		}

		const data = {
			time,
			...event_pojo || {},
			col,
			url,
			line,
			stack: target instanceof Error ? String(target.stack).split('\n') : undefined,
		}

		const str = JSON.stringify(data, null, ' ')
		const doc = $mol_dom_context.document
		const id = '$yuf_report_fallback'

		let container = doc.getElementById(id)

		if (! container) {
			container = doc.createElement('div')
			container.id = id
			container.style="bottom: 0; right: 0; position: absolute; z-index: 1000; width: 2rem; height: 2rem;"
			container.innerHTML = `
				<dialog id="${id}_dialog" style="padding: .5rem; border-radius: 4px; border-color: darkred">
					<div style="display: flex; justify-content: end; gap: .5rem;">
						<button id="${id}_copy">Copy</button>
						<button id="${id}_forget">Clear</button>
						<button id="${id}_close">Close</button>
					</div>
					<pre id="${id}_text" style="font-size: .8rem; line-height: 1rem; margin: 0;"></pre>
				</dialog>
				<button id="${id}_show" style="background: darkred; color: white; border: none">!!!</button>
			`
			doc.body.appendChild(container)
		}

		const button_show = doc.getElementById(`${id}_show`) as HTMLButtonElement
		const button_close = doc.getElementById(`${id}_close`) as HTMLButtonElement
		const button_forget = doc.getElementById(`${id}_forget`) as HTMLButtonElement
		const button_copy = doc.getElementById(`${id}_copy`) as HTMLButtonElement
		const dialog = doc.getElementById(`${id}_dialog`) as HTMLDialogElement
		const text = doc.getElementById(`${id}_text`) as HTMLPreElement
		button_show.onclick = e => dialog.showModal()
		button_close.onclick = e => dialog.close()
		button_forget.onclick = e => container.remove()

		button_copy.onclick = e => navigator.clipboard.writeText(str)

		text.innerText = str
	}

	globalThis.addEventListener('error', (...args) => report(...args))

}
