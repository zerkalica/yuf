namespace $ {
	export type $yuf_chess_position = `${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'}${'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'}`

	export const $yuf_chess_position_x = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
	export const $yuf_chess_position_y = ['8', '7', '6', '5', '4', '3', '2', '1']

	const x_name_index = $yuf_chess_position_x.reduce((acc, name, index)=> {
		acc[name] = index
		return acc
	}, {} as Record<string, number>)

	const y_name_index = $yuf_chess_position_y.reduce((acc, name, index)=> {
		acc[name] = index
		return acc
	}, {} as Record<string, number>)

	export function $yuf_chess_position_pack(id: $yuf_chess_position) {
		return [x_name_index[id[0]] ?? 0, y_name_index[id[1]] ?? 0] as const
	}

	
	export function $yuf_chess_position_color(id: $yuf_chess_position) {
		const [x, y] = $yuf_chess_position_pack(id)
		return Boolean((x + y) % 2) ? 'b' : 'w'
	}


}
