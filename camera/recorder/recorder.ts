namespace $ {
	export class $yuf_camera_recorder extends $mol_object {
		stream() {
			return new MediaStream
		}

		mime() {
			return 'video/webm; codecs=vp9'
		}

		bits_per_second() {
			return null as null | number
		}

		audio_bits_per_second() {
			return null as null | number
		}

		video_bits_per_second() {
			return null as null | number
		}

		@ $mol_mem
		native() {
			const rec = new MediaRecorder(this.stream(), {
				mimeType: this.mime(),
				audioBitsPerSecond: this.audio_bits_per_second() ?? undefined,
				videoBitsPerSecond: this.video_bits_per_second() ?? undefined,
				bitsPerSecond: this.bits_per_second() ?? undefined,
			})

			rec.ondataavailable = e => this.chunks(e.data)
			rec.onresume = rec.onstop = rec.onpause = rec.onstart = () => this.status(null)
			rec.onerror = event => this.error_packed([event.error || new Error('Unknown', { cause: { event } })])

			return rec
		}

		@ $mol_mem
		status(next?: null | 'recording' | 'paused' | 'inactive') {
			const native = this.native()
			const current = native.state
			if (next === 'recording' && current === 'paused') native.resume()
			if (next === 'recording' && current === 'inactive') native.start(this.chunks_rate())
			if (next === 'paused' && current === 'recording') {
				// if paused, native.requestData do not fire ondataavailable
				// Call flush and wait it ends before pause
				this.flush()
				native.pause()
			}
			if (next === 'inactive' && (current === 'recording' || current === 'paused') ) {
				this.flush()
				native.stop()
			}

			return native.state
		}

		@ $mol_mem
		error_packed(next?: null | readonly [ Error | null ]) {
			if (next === undefined) this.chunks()
			if (next === undefined) this.status()
			if (next?.[0] !== undefined) this.flush_end(next[0])
			return next ?? null
		}

		error(reset?: null | Error) {
			return this.error_packed(reset ? [ reset ] : reset)?.[0] ?? null
		}

		chunks_rate() {
			return 100000
		}

		@ $mol_mem
		chunks(next?: Blob | null): Blob[] {
			const prev = $mol_wire_probe(() => this.chunks()) ?? []
			if (next === undefined) return prev

			this.flush_end()

			return next === null ? [] : [...prev, next]
		}

		protected flush_promise = undefined as undefined | null | $mol_promise<void> | Error

		protected flush_end(status: null | Error = null) {
			if (! $mol_promise_like(this.flush_promise)) return
			this.flush_promise.done()
			this.flush_promise = status
		}

		@ $mol_action
		flush() {
			const native = this.native()
			if (this.flush_promise === undefined && native.state === 'recording') {
				const err = new Error('MediaRecorder requestData timeout', { cause: { recorder: this } })
				new $mol_after_timeout(this.flush_timeout(), () => this.flush_end(err))

				this.flush_promise = new $mol_promise()
				native.requestData()
			}

			if ($mol_promise_like(this.flush_promise)) $mol_fail_hidden(this.flush_promise)

			const res = this.flush_promise as null | Blob[]
			this.flush_promise = undefined

			return res ?? this.chunks()
		}

		flush_timeout() { return 5000 }

		override destructor() {
			const native = $mol_wire_probe(() => this.native())
			if (! native) return

			native.onerror = native.onpause = native.onresume = native.ondataavailable = native.onstart = native.onstop = null

			try {
				this.chunks(null)
				native.stop()
			} catch (e) {
				$mol_fail_log(e)
			}
		}
	}
}
