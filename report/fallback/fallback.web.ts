namespace $ {
	function report(event: Event | string, url?: string, line?: number, col?: number, error?: Error) {
		const time = new Date()
		const target = typeof event === 'string'
			? { event, error }
			: 'error' in event && event.error ? event.error : event

		let data

		try {
			data = $yuf_pojo(target, {
				hidden_props: /^(authorization|password)$/
			})
			if (typeof data !== 'object' || Array.isArray(data)) {
				data = { target: data }
			}
		} catch (error) {
			data = { error, target }
		}

		data = Object.assign(data, {
			time,
			col,
			url,
			line,
			stack: target instanceof Error ? String(target.stack).split('\n') : undefined,
		})

		const str = JSON.stringify(data, null, ' ')
		const doc = $mol_dom_context.document
		const id = 'yuf_report_fallback'

		let container = doc.getElementById(id)
		const buttons = ['copy', 'next', 'forget', 'close'] as const

		if (! container) {
			container = doc.createElement('div')
			container.id = id
			container.innerHTML = `
<dialog id="${id}_dialog">
	<div>
		${buttons.map(suffix => `<button id="${id}_${suffix}">${suffix}</button>`).join('\n')}
	</div>
	<pre id="${id}_text"></pre>
</dialog>
<button id="${id}_show">!!!</button>
<style>
	#${id} {
		bottom: 0;
		right: 0;
		position: absolute;
		z-index: 1000;
		width: 2rem;
		height: 2rem;
	}

	#${id} > button {
		background: darkred;
		color: white;
		border: none;
	}

	#${id} > dialog {
		padding: .5rem;
		border-radius: 4px;
		border-color: darkred;
	}

	#${id} > dialog[open] {
		display: flex;
		flex-direction: column;
		height: fit-content;
		max-height: 98%;
		width: 99%;
		gap: .5rem;
	}

	#${id} > dialog > div {
		display: flex;
		justify-content: end;
		gap: .5rem;
	}

	#${id} > dialog > pre {
		flex-grow: 111;
		font-size: .8rem;
		line-height: 1rem;
		justify-self: stretch;
		margin: 0;
		word-break: break-word;
		white-space: break-spaces;
		overflow-y: auto;
		scrollbar-width: thin;
	}
</style>`
			doc.body.appendChild(container)
		}

		const button = Object.fromEntries(
			[...buttons, 'show'].map(suffix => [ suffix, doc.getElementById(`${id}_${suffix}`) ])
		) as Record<typeof buttons[number] | 'show', HTMLButtonElement>

		const dialog = doc.getElementById(`${id}_dialog`) as HTMLDialogElement
		const text = doc.getElementById(`${id}_text`) as HTMLPreElement

		button.show.onclick = e => dialog.showModal()
		button.close.onclick = e => dialog.close()
		button.forget.onclick = e => container.remove()
		button.next.onclick = e => text.scrollTo({ top: dialog.scrollTop + text.scrollTop + text.offsetHeight })
		button.copy.onclick = e => navigator.clipboard.writeText(str)

		text.innerText = str
	}

	globalThis.addEventListener('error', (...args) => report(...args))

}
