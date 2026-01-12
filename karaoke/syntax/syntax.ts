namespace $ {
	
	export const $yuf_karaoke_syntax_flow = new $mol_syntax2({
		// file vtt header
		'code-global': /^\s*WEBVTT\s*$/,

		// style, multiline included
		// @see https://developer.mozilla.org/ru/docs/Web/API/WebVTT_API#within_the_webvtt_file_itself
		'code-field': /^(?:STYLE[-\s]*)([^]*?)^([\r\n])?$([\r\n]*)/,

		// comment, multiline included
		'code-comment-block': /^NOTE[\r\n]+([\s\S]*?)^(?:[\r\n])?$(?:[\r\n]*)/,

		// @see https://developer.mozilla.org/ru/docs/Web/API/WebVTT_API#%D0%BA%D0%BE%D0%BC%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%80%D0%B8%D0%B8_%D0%B2_webvtt
		'code-comment-inline': /^NOTE[-\s]*(.*)$/,

		// block title
		// @see https://developer.mozilla.org/ru/docs/Web/API/WebVTT_API#webvtt_cues
		'code-tag': /^(\d+)(?:\s+-\s*([\w\d\s]+))?$/,

		// time range
		// @see https://developer.mozilla.org/ru/docs/Web/API/WebVTT_API#%D0%B2%D0%BD%D1%83%D1%82%D1%80%D0%B5%D0%BD%D0%BD%D1%8F%D1%8F_%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0_%D1%84%D0%B0%D0%B9%D0%BB%D0%B0_webvtt
		'code-keyword' : /^([\d\.:]+)\s*-->\s*([\d\.:]+)(?:\s+([\w\d\s]+))?$/ ,

		'brace-open' : /<{2}/ ,
		'brace-close' : />{2}/ ,

		// time tag
		// @see https://developer.mozilla.org/ru/docs/Web/API/WebVTT_API#cue_payload_text_tags
		'code-number' : /<(\d+[\d\.:]+)>/,

		'block-splitter': /[\r\n]{2,}/,
		'row-slitter': /[\r\n]/,
	})

	export function $yuf_karaoke_syntax_parse(this: $, str: string) {
		let need_new_block = true
		let need_new_row = true
		let time_min = 0
		let time_max = 0

		let groups = [] as (string | number)[][][]

		this.$yuf_karaoke_syntax_flow.tokenize(str, ( name , found , chunks ) => {
			if (name === 'code-keyword') {
				// row or block time range
				const [ min, max ] = chunks
				time_min = str_to_ms(min)
				time_max = str_to_ms(max)
			}

			if (name === 'block-splitter') {
				//end block
				need_new_row = need_new_block = true

				const rows = groups.at(-1)
				if (time_max && rows?.length) {
					rows[rows.length - 1].push(time_max, ' ')
				}
				time_max = 0
			}

			if (name === 'row-slitter') {
				// end row
				need_new_row = true
			}

			if (name === 'code-number') {
				// time label
				const [ min, ] = chunks
				time_min = str_to_ms(min)
			}

			if (name === '') {
				if (need_new_block) groups.push([])
				const rows = groups[groups.length - 1]
				if (need_new_row) rows.push([])
				need_new_block = need_new_row = false
				rows[rows.length - 1].push(time_min, chunks[0])
			}
		})

		return groups
	}

	function str_to_ms(str: string) {
		const [, h, m, s, msec ] = str.match(/(?:(\d+):)?(\d+):(\d+)(?:\.(\d+))?/) ?? []
		let ms = 0
		if (h) ms += Number(h) * 60 * 60 * 1000
		if (m) ms += Number(m) * 60 * 1000
		if (s) ms += Number(s) * 1000
		if (msec) ms += Number(msec)

		return ms
	}

}
