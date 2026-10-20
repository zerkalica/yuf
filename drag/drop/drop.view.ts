namespace $.$$ {
	export class $yuf_drag_drop extends $.$yuf_drag_drop {
		
		override args() { return { [this.param()]: this.id() } }
		override uris() { return this.$.$mol_state_arg.link(this.args()) }
		override start(e?: DragEvent) {
			const crt = this.Drag_image()?.dom_node()
			if ( crt ) {
				let x = 0
				let y = 0
				if (this.drag_align() === 'center') {
					x = crt.clientWidth / 2
					y = crt.clientHeight / 2
				}
				e?.dataTransfer?.setDragImage(crt, x, y)
			}

			this.$.$yuf_drop.dragging.add(this.uris())
		}

		override end(e?: Event) {
			new this.$.$mol_after_frame($mol_wire_async(() => {
				const uris = this.uris()
				if (! this.$.$yuf_drop.dragging.has(uris)) return
				$mol_error_fence( () => this.receive_outside(e), e => ($mol_fail_log(e), null))
				this.$.$yuf_drop.dragging.delete(uris)
			}))
		}

		@ $mol_mem
		status( next = 'ready' as 'ready' | 'drag' ) { return next }

		override drag_start( event : DragEvent ) {

			setTimeout( ()=> this.status( 'drag' ) )

			const transfer = this.transfer()
			for( let type in transfer ) {
				event.dataTransfer!.setData( type , transfer[ type as keyof typeof transfer] )
			}

			event.dataTransfer!.setDragImage( this.image() , 0 , -32 )
			
			const effects = [] as string[]
			if( this.allow_copy() ) effects.push( 'Copy' )
			if( this.allow_link() ) effects.push( 'Link' )
			if( this.allow_move() ) effects.push( 'Move' )

			let effectAllowed = effects[0].toLowerCase() + effects.slice(1).join('')
			if( effectAllowed === 'copyLinkMove' ) effectAllowed = 'all'
			event.dataTransfer!.effectAllowed = effectAllowed as DataTransfer['effectAllowed']
			
			this.start( event )
			
		}
		
		override drag_end( event : DragEvent ) {
			setTimeout( ()=> this.status( 'ready' ) )
			this.end( event )
		}

	}
}
