namespace $ {
	function report(event: Event | string, url?: string, line?: number, col?: number, error?: Error) {
		const time = new Date()
		const options = {
			hidden_props: /^(authorization|password)$/
		}

		const event_pojo = typeof event === 'string' ? { event, error } :
			$yuf_pojo('error' in event ? event.error : event, options)

		const data = {
			time,
			...event_pojo || {},
			col,
			url,
			line,
		}

		const str = JSON.stringify(data, null, ' ')
		const doc = $mol_dom_context.document
		const id = '$yuf_report_fallback'

		let container = doc.getElementById(id)

		if (! container) {
			container = doc.createElement('div')
			container.id = id
			container.style="top: 0; right: 0; position: absolute; z-index: 1000; width: 100px; height: 100px;"
			container.innerHTML = `
				<dialog id="${id}_dialog">
					<div style="display: flex; justify-content: end; gap: 1rem;">
						<button id="${id}_copy">Copy</button>
						<button id="${id}_forget">Forget</button>
						<button id="${id}_close">Close</button>
					</div>
					<pre id="${id}_text" style="font-size: .8rem"></pre>
				</dialog>
				<button id="${id}_show">Show errors</button>
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

	globalThis.addEventListener('error', $mol_wire_async((...args) => report(...args)))

}
