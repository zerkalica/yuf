namespace $.$$ {
	export class $yuf_list_slicer_demo extends $.$yuf_list_slicer_demo {
		
		override item_title( id : number ) : string {
			return `Item #${ id + 1 }`
		}

		@ $mol_mem
		override list_items() {
			const rows = []

			for ( let key = 0 ; key < this.items_count() ; key++ ) {
				rows.push( this.Item( key ) )
			}
			
			return rows
		}
		
	}
}
