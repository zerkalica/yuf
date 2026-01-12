// @ts-check

/**
 * @see https://www.karaoke.co.uk/stream/playlist/free-karaoke-songs
 * @param {{Lyric: string, StartTime: number, EndTime: number, Row: number, Group: number}[]} words
 */
function codes_to_vtt(words) {
	/** @type {Record<number, { span: [min: number, max: number], rows: Record<number, { span: [min: number, max: number], words: [ min: number, max: number, val: string ][]}>}>} */
	const group_times = {}

	for (const word of words) {
		let group = group_times[word.Group]
		if (! group) group = group_times[word.Group] = { span: [0, 0], rows: {} }
		let row = group.rows[word.Row]
		if (! row) row = group.rows[word.Row] = { span: [0, 0], words: [] }

		row.words.push([ word.StartTime, word.EndTime, word.Lyric ])

		if (! group.span[0]) group.span[0] = word.StartTime
		group.span[1] = word.EndTime

		if (! row.span[0]) row.span[0] = word.StartTime
		row.span[1] = word.EndTime
	}

	const result = ['WEBVTT', '']

	const groups = Object.values(group_times)
	for (let group_index = 0; group_index < groups.length - 1; group_index++) {
		const group = groups[group_index]
		result.push(`${ms_to_time_str(group.span[0])} --> ${ms_to_time_str(group.span[1])}`)

		const rows = Object.values(group.rows)

		for (let row_index = 0; row_index < rows.length; row_index++) {
			const row = rows[row_index]
			const is_row_first = row_index === 0
			const is_row_last = row_index === rows.length - 1
			let row_str = ''

			for (let word_index = 0; word_index < row.words.length; word_index++) {
				const [min, max, val] = row.words[word_index]
				const min_next = row.words[word_index + 1]?.[0]
					?? rows[row_index + 1]?.span[0]
					?? groups[group_index + 1]?.span[0] ?? [ ]

				row_str += `${
					is_row_first && word_index === 0 ? '' : `<${ms_to_time_str(min)}>`
				}${
					val.trim()
				}${
					(is_row_last && word_index === row.words.length - 1) || max === min_next ? '' : `<${ms_to_time_str(max)}>`
				}${
					val.at(-1) === ' ' ? ' ' : ''
				}`
			}

			result.push(row_str)
		}

		result.push('')
	}

	return result.join('\n')
}

/**
 * 
 * @param {number} ms
 */
function ms_to_time_str(ms) {
	const date = new Date(ms)
	const hours = date.getUTCHours()
	const min = date.getUTCMinutes()
	const sec = date.getUTCSeconds()
	const msec = date.getUTCMilliseconds()

	return `${
		hours ? String(hours).padStart(2, '0') + ':' : ''}${
		String(min).padStart(2, '0')}:${
		String(sec).padStart(2, '0')}.${
		String(msec).padStart(3, '0')
	}`
}

const words = [
  {
    "Lyric": "Oh ",
    "StartTime": 16500,
    "EndTime": 16770,
    "Row": 2,
    "Group": 1,
    "ColourGroup": "15",
    "PageLine": "\t65\t"
  },
  {
    "Lyric": "yeah, ",
    "StartTime": 17020,
    "EndTime": 17360,
    "Row": 2,
    "Group": 1,
    "ColourGroup": "15",
    "PageLine": "\t65\t"
  },
  {
    "Lyric": "I'll ",
    "StartTime": 17360,
    "EndTime": 18020,
    "Row": 2,
    "Group": 1,
    "ColourGroup": "15",
    "PageLine": "\t65\t"
  },
  {
    "Lyric": "tell",
    "StartTime": 18570,
    "EndTime": 18790,
    "Row": 2,
    "Group": 1,
    "ColourGroup": "15",
    "PageLine": "\t65\t"
  },
  {
    "Lyric": "you ",
    "StartTime": 19040,
    "EndTime": 19190,
    "Row": 3,
    "Group": 1,
    "ColourGroup": "15",
    "PageLine": "\t95\t"
  },
  {
    "Lyric": "something, ",
    "StartTime": 19190,
    "EndTime": 19910,
    "Row": 3,
    "Group": 1,
    "ColourGroup": "15",
    "PageLine": "\t95\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 21120,
    "EndTime": 21320,
    "Row": 3,
    "Group": 1,
    "ColourGroup": "15",
    "PageLine": "\t95\t"
  },
  {
    "Lyric": "think",
    "StartTime": 21320,
    "EndTime": 21500,
    "Row": 3,
    "Group": 1,
    "ColourGroup": "15",
    "PageLine": "\t95\t"
  },
  {
    "Lyric": "you'll ",
    "StartTime": 21500,
    "EndTime": 21670,
    "Row": 4,
    "Group": 1,
    "ColourGroup": "15",
    "PageLine": "\t125\t"
  },
  {
    "Lyric": "understand",
    "StartTime": 21670,
    "EndTime": 23290,
    "Row": 4,
    "Group": 1,
    "ColourGroup": "15",
    "PageLine": "\t125\t"
  },
  {
    "Lyric": "When ",
    "StartTime": 24150,
    "EndTime": 24500,
    "Row": 2,
    "Group": 2,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 24500,
    "EndTime": 25180,
    "Row": 2,
    "Group": 2,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "say ",
    "StartTime": 25710,
    "EndTime": 25920,
    "Row": 2,
    "Group": 2,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "that",
    "StartTime": 26170,
    "EndTime": 26330,
    "Row": 2,
    "Group": 2,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "something, ",
    "StartTime": 26330,
    "EndTime": 27350,
    "Row": 3,
    "Group": 2,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 28250,
    "EndTime": 28390,
    "Row": 3,
    "Group": 2,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "wanna",
    "StartTime": 28390,
    "EndTime": 28800,
    "Row": 3,
    "Group": 2,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "hold ",
    "StartTime": 29050,
    "EndTime": 29450,
    "Row": 4,
    "Group": 2,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 29450,
    "EndTime": 29590,
    "Row": 4,
    "Group": 2,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "hand",
    "StartTime": 29590,
    "EndTime": 31670,
    "Row": 4,
    "Group": 2,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 32060,
    "EndTime": 32180,
    "Row": 2,
    "Group": 3,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "wanna ",
    "StartTime": 32180,
    "EndTime": 32510,
    "Row": 2,
    "Group": 3,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "hold ",
    "StartTime": 32510,
    "EndTime": 32860,
    "Row": 2,
    "Group": 3,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 33110,
    "EndTime": 33410,
    "Row": 2,
    "Group": 3,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "hand",
    "StartTime": 33410,
    "EndTime": 34980,
    "Row": 2,
    "Group": 3,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 35450,
    "EndTime": 35580,
    "Row": 3,
    "Group": 3,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "wanna ",
    "StartTime": 35580,
    "EndTime": 35920,
    "Row": 3,
    "Group": 3,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "hold ",
    "StartTime": 36170,
    "EndTime": 36560,
    "Row": 3,
    "Group": 3,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 36560,
    "EndTime": 36830,
    "Row": 3,
    "Group": 3,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "hand",
    "StartTime": 37080,
    "EndTime": 37770,
    "Row": 3,
    "Group": 3,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "Oh, ",
    "StartTime": 38350,
    "EndTime": 38680,
    "Row": 2,
    "Group": 4,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "please, ",
    "StartTime": 38680,
    "EndTime": 39340,
    "Row": 2,
    "Group": 4,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "say ",
    "StartTime": 40190,
    "EndTime": 40370,
    "Row": 2,
    "Group": 4,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "to",
    "StartTime": 40370,
    "EndTime": 40530,
    "Row": 2,
    "Group": 4,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "me ",
    "StartTime": 40530,
    "EndTime": 41260,
    "Row": 3,
    "Group": 4,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "you'll ",
    "StartTime": 42500,
    "EndTime": 42710,
    "Row": 3,
    "Group": 4,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "let ",
    "StartTime": 42710,
    "EndTime": 42880,
    "Row": 3,
    "Group": 4,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "me ",
    "StartTime": 43130,
    "EndTime": 43300,
    "Row": 3,
    "Group": 4,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "be",
    "StartTime": 43300,
    "EndTime": 43640,
    "Row": 3,
    "Group": 4,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 43640,
    "EndTime": 43960,
    "Row": 4,
    "Group": 4,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "man",
    "StartTime": 44210,
    "EndTime": 44930,
    "Row": 4,
    "Group": 4,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "And ",
    "StartTime": 45470,
    "EndTime": 45830,
    "Row": 2,
    "Group": 5,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "please, ",
    "StartTime": 46080,
    "EndTime": 46720,
    "Row": 2,
    "Group": 5,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "say ",
    "StartTime": 47320,
    "EndTime": 47520,
    "Row": 2,
    "Group": 5,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "to",
    "StartTime": 47520,
    "EndTime": 47690,
    "Row": 2,
    "Group": 5,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "me, ",
    "StartTime": 47690,
    "EndTime": 48370,
    "Row": 3,
    "Group": 5,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "you'll ",
    "StartTime": 49660,
    "EndTime": 49840,
    "Row": 3,
    "Group": 5,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "let ",
    "StartTime": 50090,
    "EndTime": 50240,
    "Row": 3,
    "Group": 5,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "me ",
    "StartTime": 50240,
    "EndTime": 50420,
    "Row": 3,
    "Group": 5,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "hold",
    "StartTime": 50420,
    "EndTime": 50800,
    "Row": 3,
    "Group": 5,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 51050,
    "EndTime": 51220,
    "Row": 4,
    "Group": 5,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "hand",
    "StartTime": 51220,
    "EndTime": 52950,
    "Row": 4,
    "Group": 5,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "Now ",
    "StartTime": 53380,
    "EndTime": 53560,
    "Row": 2,
    "Group": 6,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "let ",
    "StartTime": 53560,
    "EndTime": 53710,
    "Row": 2,
    "Group": 6,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "me ",
    "StartTime": 53710,
    "EndTime": 53910,
    "Row": 2,
    "Group": 6,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "hold",
    "StartTime": 54160,
    "EndTime": 54500,
    "Row": 2,
    "Group": 6,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 54500,
    "EndTime": 54830,
    "Row": 3,
    "Group": 6,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "hand.",
    "StartTime": 55080,
    "EndTime": 56610,
    "Row": 3,
    "Group": 6,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 57070,
    "EndTime": 57210,
    "Row": 4,
    "Group": 6,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "wanna ",
    "StartTime": 57210,
    "EndTime": 57550,
    "Row": 4,
    "Group": 6,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "hold ",
    "StartTime": 57550,
    "EndTime": 57900,
    "Row": 4,
    "Group": 6,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 58150,
    "EndTime": 58460,
    "Row": 4,
    "Group": 6,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "hand",
    "StartTime": 58460,
    "EndTime": 59150,
    "Row": 4,
    "Group": 6,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "And ",
    "StartTime": 60660,
    "EndTime": 60980,
    "Row": 2,
    "Group": 7,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "when ",
    "StartTime": 61230,
    "EndTime": 61560,
    "Row": 2,
    "Group": 7,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 61560,
    "EndTime": 61910,
    "Row": 2,
    "Group": 7,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "touch ",
    "StartTime": 62160,
    "EndTime": 62500,
    "Row": 2,
    "Group": 7,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "you",
    "StartTime": 62500,
    "EndTime": 62840,
    "Row": 2,
    "Group": 7,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 63090,
    "EndTime": 63410,
    "Row": 3,
    "Group": 7,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "feel ",
    "StartTime": 63410,
    "EndTime": 63750,
    "Row": 3,
    "Group": 7,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "happy, ",
    "StartTime": 64000,
    "EndTime": 64540,
    "Row": 3,
    "Group": 7,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "inside",
    "StartTime": 65240,
    "EndTime": 66740,
    "Row": 3,
    "Group": 7,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "It's ",
    "StartTime": 67740,
    "EndTime": 68080,
    "Row": 2,
    "Group": 8,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "such ",
    "StartTime": 68330,
    "EndTime": 68670,
    "Row": 2,
    "Group": 8,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "a ",
    "StartTime": 68670,
    "EndTime": 69000,
    "Row": 2,
    "Group": 8,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "feeling",
    "StartTime": 69250,
    "EndTime": 69920,
    "Row": 2,
    "Group": 8,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "that ",
    "StartTime": 70170,
    "EndTime": 70530,
    "Row": 3,
    "Group": 8,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "my ",
    "StartTime": 70530,
    "EndTime": 70890,
    "Row": 3,
    "Group": 8,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "love, ",
    "StartTime": 71140,
    "EndTime": 71570,
    "Row": 3,
    "Group": 8,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 72270,
    "EndTime": 72410,
    "Row": 3,
    "Group": 8,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "can't ",
    "StartTime": 72410,
    "EndTime": 72570,
    "Row": 3,
    "Group": 8,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "hide",
    "StartTime": 72570,
    "EndTime": 73620,
    "Row": 3,
    "Group": 8,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 74110,
    "EndTime": 74260,
    "Row": 2,
    "Group": 9,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "can't ",
    "StartTime": 74260,
    "EndTime": 74420,
    "Row": 2,
    "Group": 9,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "hide",
    "StartTime": 74420,
    "EndTime": 75530,
    "Row": 2,
    "Group": 9,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 75710,
    "EndTime": 75860,
    "Row": 3,
    "Group": 9,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "can't ",
    "StartTime": 76110,
    "EndTime": 76260,
    "Row": 3,
    "Group": 9,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "hide",
    "StartTime": 76260,
    "EndTime": 78730,
    "Row": 3,
    "Group": 9,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "Yeah ",
    "StartTime": 79490,
    "EndTime": 79840,
    "Row": 2,
    "Group": 10,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "you, ",
    "StartTime": 80090,
    "EndTime": 80680,
    "Row": 2,
    "Group": 10,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "got ",
    "StartTime": 81340,
    "EndTime": 81520,
    "Row": 2,
    "Group": 10,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "that",
    "StartTime": 81520,
    "EndTime": 81680,
    "Row": 2,
    "Group": 10,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "something, ",
    "StartTime": 81680,
    "EndTime": 82370,
    "Row": 3,
    "Group": 10,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 83650,
    "EndTime": 83810,
    "Row": 3,
    "Group": 10,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "think",
    "StartTime": 84060,
    "EndTime": 84250,
    "Row": 3,
    "Group": 10,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "you'll ",
    "StartTime": 84250,
    "EndTime": 84440,
    "Row": 4,
    "Group": 10,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "understand",
    "StartTime": 84440,
    "EndTime": 86020,
    "Row": 4,
    "Group": 10,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "When ",
    "StartTime": 86630,
    "EndTime": 86940,
    "Row": 2,
    "Group": 11,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 87190,
    "EndTime": 87800,
    "Row": 2,
    "Group": 11,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "say ",
    "StartTime": 88470,
    "EndTime": 88650,
    "Row": 2,
    "Group": 11,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "that",
    "StartTime": 88650,
    "EndTime": 88800,
    "Row": 2,
    "Group": 11,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "something, ",
    "StartTime": 89050,
    "EndTime": 89720,
    "Row": 3,
    "Group": 11,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 91070,
    "EndTime": 91240,
    "Row": 3,
    "Group": 11,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "wanna",
    "StartTime": 91240,
    "EndTime": 91610,
    "Row": 3,
    "Group": 11,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "hold ",
    "StartTime": 91610,
    "EndTime": 91980,
    "Row": 4,
    "Group": 11,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 92230,
    "EndTime": 92370,
    "Row": 4,
    "Group": 11,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "hand",
    "StartTime": 92370,
    "EndTime": 94050,
    "Row": 4,
    "Group": 11,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 94560,
    "EndTime": 94690,
    "Row": 2,
    "Group": 12,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "wanna ",
    "StartTime": 94690,
    "EndTime": 95040,
    "Row": 2,
    "Group": 12,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "hold ",
    "StartTime": 95290,
    "EndTime": 95650,
    "Row": 2,
    "Group": 12,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 95650,
    "EndTime": 96010,
    "Row": 2,
    "Group": 12,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "hand",
    "StartTime": 96260,
    "EndTime": 97710,
    "Row": 2,
    "Group": 12,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 98210,
    "EndTime": 98360,
    "Row": 3,
    "Group": 12,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "wanna ",
    "StartTime": 98360,
    "EndTime": 98660,
    "Row": 3,
    "Group": 12,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "hold ",
    "StartTime": 98660,
    "EndTime": 99090,
    "Row": 3,
    "Group": 12,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 99340,
    "EndTime": 99560,
    "Row": 3,
    "Group": 12,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "hand",
    "StartTime": 99560,
    "EndTime": 100280,
    "Row": 3,
    "Group": 12,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "And ",
    "StartTime": 102060,
    "EndTime": 102380,
    "Row": 2,
    "Group": 13,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "when ",
    "StartTime": 102380,
    "EndTime": 102740,
    "Row": 2,
    "Group": 13,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 102740,
    "EndTime": 103060,
    "Row": 2,
    "Group": 13,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "touch ",
    "StartTime": 103310,
    "EndTime": 103650,
    "Row": 2,
    "Group": 13,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "you",
    "StartTime": 103650,
    "EndTime": 103990,
    "Row": 2,
    "Group": 13,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 104240,
    "EndTime": 104550,
    "Row": 3,
    "Group": 13,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "feel ",
    "StartTime": 104550,
    "EndTime": 104930,
    "Row": 3,
    "Group": 13,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "happy, ",
    "StartTime": 105180,
    "EndTime": 105630,
    "Row": 3,
    "Group": 13,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "inside",
    "StartTime": 106370,
    "EndTime": 107850,
    "Row": 3,
    "Group": 13,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "It's ",
    "StartTime": 109180,
    "EndTime": 109500,
    "Row": 2,
    "Group": 14,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "such ",
    "StartTime": 109500,
    "EndTime": 109810,
    "Row": 2,
    "Group": 14,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "a ",
    "StartTime": 110060,
    "EndTime": 110360,
    "Row": 2,
    "Group": 14,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "feeling",
    "StartTime": 110360,
    "EndTime": 111010,
    "Row": 2,
    "Group": 14,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "that ",
    "StartTime": 111260,
    "EndTime": 111700,
    "Row": 3,
    "Group": 14,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "my ",
    "StartTime": 111700,
    "EndTime": 112040,
    "Row": 3,
    "Group": 14,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "love, ",
    "StartTime": 112290,
    "EndTime": 112670,
    "Row": 3,
    "Group": 14,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 113460,
    "EndTime": 113600,
    "Row": 3,
    "Group": 14,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "can't ",
    "StartTime": 113600,
    "EndTime": 113750,
    "Row": 3,
    "Group": 14,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "hide",
    "StartTime": 114000,
    "EndTime": 115020,
    "Row": 3,
    "Group": 14,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 115250,
    "EndTime": 115420,
    "Row": 2,
    "Group": 15,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "can't ",
    "StartTime": 115420,
    "EndTime": 115550,
    "Row": 2,
    "Group": 15,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "hide",
    "StartTime": 115550,
    "EndTime": 116670,
    "Row": 2,
    "Group": 15,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 117110,
    "EndTime": 117270,
    "Row": 3,
    "Group": 15,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "can't ",
    "StartTime": 117270,
    "EndTime": 117420,
    "Row": 3,
    "Group": 15,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "hide",
    "StartTime": 117420,
    "EndTime": 120460,
    "Row": 3,
    "Group": 15,
    "ColourGroup": "15",
    "PageLine": "\t96\t"
  },
  {
    "Lyric": "Yeah ",
    "StartTime": 120730,
    "EndTime": 121040,
    "Row": 2,
    "Group": 16,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "you, ",
    "StartTime": 121290,
    "EndTime": 121810,
    "Row": 2,
    "Group": 16,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "got ",
    "StartTime": 122490,
    "EndTime": 122660,
    "Row": 2,
    "Group": 16,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "that",
    "StartTime": 122660,
    "EndTime": 122810,
    "Row": 2,
    "Group": 16,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "something, ",
    "StartTime": 123060,
    "EndTime": 123680,
    "Row": 3,
    "Group": 16,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 125070,
    "EndTime": 125250,
    "Row": 3,
    "Group": 16,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "think",
    "StartTime": 125250,
    "EndTime": 125440,
    "Row": 3,
    "Group": 16,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "you'll ",
    "StartTime": 125440,
    "EndTime": 125620,
    "Row": 4,
    "Group": 16,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "understand",
    "StartTime": 125620,
    "EndTime": 127190,
    "Row": 4,
    "Group": 16,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "When ",
    "StartTime": 128040,
    "EndTime": 128380,
    "Row": 2,
    "Group": 17,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 128380,
    "EndTime": 128930,
    "Row": 2,
    "Group": 17,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "feel ",
    "StartTime": 129580,
    "EndTime": 129760,
    "Row": 2,
    "Group": 17,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "that",
    "StartTime": 130010,
    "EndTime": 130180,
    "Row": 2,
    "Group": 17,
    "ColourGroup": "15",
    "PageLine": "\t52\t"
  },
  {
    "Lyric": "something, ",
    "StartTime": 130180,
    "EndTime": 130840,
    "Row": 3,
    "Group": 17,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 132200,
    "EndTime": 132360,
    "Row": 3,
    "Group": 17,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "wanna",
    "StartTime": 132360,
    "EndTime": 132760,
    "Row": 3,
    "Group": 17,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "hold ",
    "StartTime": 133010,
    "EndTime": 133400,
    "Row": 4,
    "Group": 17,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 133400,
    "EndTime": 133550,
    "Row": 4,
    "Group": 17,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "hand",
    "StartTime": 133550,
    "EndTime": 135270,
    "Row": 4,
    "Group": 17,
    "ColourGroup": "15",
    "PageLine": "\t112\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 135700,
    "EndTime": 135840,
    "Row": 2,
    "Group": 18,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "wanna ",
    "StartTime": 136090,
    "EndTime": 136400,
    "Row": 2,
    "Group": 18,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "hold ",
    "StartTime": 136400,
    "EndTime": 136800,
    "Row": 2,
    "Group": 18,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 137050,
    "EndTime": 137360,
    "Row": 2,
    "Group": 18,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "hand",
    "StartTime": 137360,
    "EndTime": 138880,
    "Row": 2,
    "Group": 18,
    "ColourGroup": "15",
    "PageLine": "\t67\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 139340,
    "EndTime": 139470,
    "Row": 3,
    "Group": 18,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "wanna ",
    "StartTime": 139470,
    "EndTime": 139800,
    "Row": 3,
    "Group": 18,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "hold ",
    "StartTime": 140050,
    "EndTime": 140440,
    "Row": 3,
    "Group": 18,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 140440,
    "EndTime": 140740,
    "Row": 3,
    "Group": 18,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "hand",
    "StartTime": 140740,
    "EndTime": 142380,
    "Row": 3,
    "Group": 18,
    "ColourGroup": "15",
    "PageLine": "\t97\t"
  },
  {
    "Lyric": "I ",
    "StartTime": 143070,
    "EndTime": 143220,
    "Row": 2,
    "Group": 19,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "wanna ",
    "StartTime": 143220,
    "EndTime": 143520,
    "Row": 2,
    "Group": 19,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "hold ",
    "StartTime": 143520,
    "EndTime": 143880,
    "Row": 2,
    "Group": 19,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "your ",
    "StartTime": 144130,
    "EndTime": 144450,
    "Row": 2,
    "Group": 19,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  },
  {
    "Lyric": "hand",
    "StartTime": 144450,
    "EndTime": 147980,
    "Row": 2,
    "Group": 19,
    "ColourGroup": "15",
    "PageLine": "\t82\t"
  }
]

console.log(codes_to_vtt(words))
