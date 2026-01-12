namespace $ {
	$mol_test({
		
		'$yuf_karaoke_syntax'($) {
			const str = `
WEBVTT

NOTE
Multiline note with empty first line
Comment

NOTE The Beatles

1 - Chapter 1
0:16.500 --> 0:23.290
Oh<0:16.770> <0:17.20>yeah, I'll tell
<0:19.40>you something, I think
<0:21.500>you'll <0:21.670>understand

2
0:24.150 --> 0:31.670
When I say that

0:24.150 --> 0:31.670
When I say that
`
			const tokens = [] as {name: String, found: string}[]

			$.$yuf_karaoke_syntax_flow.tokenize(str, ( name , found , chunks ) => {
				tokens.push({ name, found })
			})

			$mol_assert_equal(tokens, [
    {
        "name": "code-global",
        "found": "\nWEBVTT\n"
    },
    {
        "name": "row-slitter",
        "found": "\n"
    },
    {
        "name": "code-comment-block",
        "found": "NOTE\nMultiline note with empty first line\nComment\n\n"
    },
    {
        "name": "code-comment-inline",
        "found": "NOTE The Beatles"
    },
    {
        "name": "block-splitter",
        "found": "\n\n"
    },
    {
        "name": "code-tag",
        "found": "1 - Chapter 1"
    },
    {
        "name": "row-slitter",
        "found": "\n"
    },
    {
        "name": "code-keyword",
        "found": "0:16.500 --> 0:23.290"
    },
    {
        "name": "row-slitter",
        "found": "\n"
    },
    {
        "name": "",
        "found": "Oh"
    },
    {
        "name": "code-number",
        "found": "<0:16.770>"
    },
    {
        "name": "",
        "found": " "
    },
    {
        "name": "code-number",
        "found": "<0:17.20>"
    },
    {
        "name": "",
        "found": "yeah, I'll tell"
    },
    {
        "name": "row-slitter",
        "found": "\n"
    },
    {
        "name": "code-number",
        "found": "<0:19.40>"
    },
    {
        "name": "",
        "found": "you something, I think"
    },
    {
        "name": "row-slitter",
        "found": "\n"
    },
    {
        "name": "code-number",
        "found": "<0:21.500>"
    },
    {
        "name": "",
        "found": "you'll "
    },
    {
        "name": "code-number",
        "found": "<0:21.670>"
    },
    {
        "name": "",
        "found": "understand"
    },
    {
        "name": "block-splitter",
        "found": "\n\n"
    },
    {
        "name": "code-tag",
        "found": "2"
    },
    {
        "name": "row-slitter",
        "found": "\n"
    },
    {
        "name": "code-keyword",
        "found": "0:24.150 --> 0:31.670\nWhen I say that\n"
    },
    {
        "name": "row-slitter",
        "found": "\n"
    },
    {
        "name": "code-keyword",
        "found": "0:24.150 --> 0:31.670\nWhen I say that\n"
    }
])
			
		} ,
		
	})
}
