namespace $ {
	export class $yuf_chess_model_stockfish extends $yuf_chess_model {
		url() {
			return 'yuf/chess/model/stockfish/engine/stockfish-nnue-16-single.js'
		}

		@ $mol_mem
		protected worker() {
			const worker = new Worker(this.url())
			worker.onmessage = (e: MessageEvent) => this.on_message(e.data)
			worker.onerror = (e: ErrorEvent) => this.promise?.fail(new $mol_error_mix(e.message || e.error, e))
			return worker
		}

		@ $mol_mem
		protected data(next?: readonly string[]) {
			return next ?? []
		}

		protected promise = null as null | $mol_promise<readonly string[]>

		protected async send_raw(cmd: string) {
			let current
			do {
				current = this.promise
				try { await current } catch (e) {}
			} while (current !== this.promise)

			const promise = this.promise = new $mol_promise<readonly string[]>()

			const handler = setTimeout(() => promise.done([]), this.deadline())

			const done = promise.done
			promise.done = (val) => {
				clearTimeout(handler)
				done.call(promise, val)
			}

			this.$.$mol_log3_rise({
				place: '$yuf_chess_model_stockfish.send()',
				message: cmd,
			})

			this.worker().postMessage(cmd)
			this.worker().postMessage('isready')

			// await new Promise(resolve => setTimeout(resolve, 500))

			return promise
		}

		protected messages = [] as string[]
		protected on_message(raw: string) {
			this.messages.push(raw)
			if (raw !== 'readyok') return
			this.promise?.done(this.messages)
			this.messages = []
		}

		// Если в ответ на postMessage сервер не отвечает в течении этого времени, считаем это ошибкой, timeout
		deadline() { return 15000 }

		async send_safe(cmd: string) {
			let res
			while (! (res = (await this.send_raw(cmd))).includes('readyok') ) {
				this.$.$mol_log3_warn({
					place: '$yuf_chess_model_stockfish.send_safe()',
					message: 'slow response',
					hint: 'low cpu, bad connection?',
					cmd,
				})
				await new Promise(resolve => setTimeout(resolve, 500))
			}
			return res
		}

		protected send(cmd: string) { return $mol_wire_sync(this).send_safe(cmd) }

		@ $mol_mem
		override started_at(reset?: null) {
			this.send('ucinewgame')
			return super.started_at(reset)
		}

		@ $mol_mem
		protected position() {
			this.started_at()
			const moves = this.moves().map(move => move.from + move.to + ( move.promotion ?? '' ))
			const position = `position fen ${this.fen_initial_normalized()}${moves.length ? ` moves ${moves.join(' ')}` : ''}`
			this.send(position)
			return position
		}

		@ $mol_mem
		protected depth() {
			const l = this.level()
			const depth = (this.levels().indexOf(l) + 1) || 1

			return depth * 4
		}

		@ $mol_mem
		override tops() {
			$mol_wire_solid()
			this.position()
			const out = this.send(`go depth ${this.depth() + ( this.enemy_active() ? 0 : 2 )}`)

			const moves = {} as Record<string, $yuf_chess_move>
			let move = null as null | $yuf_chess_move

			for (const raw of out) {
				const info =  raw.match(/^info.* (?:score (?:(cp|mate) (\d+))|(lowerbound|upperbound)).* pv( [a-h][1-8][a-h][1-8][rnbq]?)+/)
				if (info) {
					let score_raw = Number(info[1])
					if (Number.isNaN(score_raw)) score_raw = 0
					const mate = info[1] === 'mate'
					const bad = score_raw < 0
					const best = raw.match(/([a-h][1-8])([a-h][1-8])([rnbq])?/)
					if (! best?.[1]) {
						throw new Error(`${raw} cant extract moves`)
					}

					move = {
						from: best[1] as $yuf_chess_position,
						to: best[2] as $yuf_chess_position,
						score: bad ? (mate ? 2 : 3) : (mate ? 5 : 4),
						promotion: (best[3] || null) as $yuf_chess_promotion | null
					}
				}

				const best = raw.match(/^bestmove ([a-h][1-8])([a-h][1-8])([rnbq])?/)
				if ( best ) {
					move = {
						from: best[1] as $yuf_chess_position,
						to: best[2] as $yuf_chess_position,
						score: moves[ best[1] + best[2] + (best[3] ?? '') ]?.score || 5,
						promotion: (best[3] || null) as $yuf_chess_promotion | null
					}
				}

				if (! move) continue

				moves[move.from + move.to + (move.promotion ?? '')] = move
			}

			const scores = Object.values(moves)
			scores.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))

			return scores
		}

		@ $mol_mem
		protected legal_all() {
			this.position()
			return this.send(`go perft 2`).reduce((acc, raw) => {
				const match = raw.match(/^([a-h][1-8])([a-h][1-8])([rnbq])?/)
				if (! match) return acc
				const move = {
					from: match[1] as $yuf_chess_position,
					to: match[2] as $yuf_chess_position,
					promotion: match[3] as $yuf_chess_promotion | null,
				}

				let level = acc[move.from]
				if (! level) level = acc[move.from] = {} as Record<$yuf_chess_position, $yuf_chess_promotion[] | null>
				if (! level[move.to]) level[move.to] = []
				if (move.promotion) level[move.to]?.push(move.promotion)

				return acc
			}, {} as Record<$yuf_chess_position, Record<$yuf_chess_position, $yuf_chess_promotion[] | null> | null>)
		}

		@ $mol_mem
		override check_position() {
			try {
				const positions = Object.keys(this.legal_all()) as $yuf_chess_position[]
				if (positions.length !== 1) return null
				if (this.piece_id(positions[0])?.[0]?.toUpperCase() !== 'K') return null
				return positions[0]
			} catch (e) {
				if ($mol_promise_like(e)) return null
				this.$.$mol_fail_log(e)
				return null
			}
		}

		override legal(pos: $yuf_chess_position) { return this.legal_all()[pos] }

		@ $mol_mem
		override status() {
			if (Object.keys(this.legal_all()).length > 0) return null
			return this.checkers().length ? 'checkmate' : 'draw'
		}

		@ $mol_mem
		protected debug_info(): {
			fen: string
			checkers: readonly $yuf_chess_position[]
		} {
			if (! this.moves().length) return {
				fen: this.fen_initial_normalized(),
				checkers: []
			}

			this.position()
			const raw = this.send(`d`)

			const fen = raw.map(raw => raw.match(/^Fen: (.+)/)?.[1]).find($mol_guard_defined)
			if (! fen) throw new Error('Required fen', { cause: { chess_engine_response: raw } })

			const checkers = raw.map(raw => raw.match(/^Checkers:((?: [a-h][1-8])+)/)
				?.[1].split(' ') as (undefined | readonly $yuf_chess_position[])
			).find($mol_guard_defined) ?? []

			return { fen, checkers }
		}

		override checkers() { return this.debug_info().checkers }
	}
}
