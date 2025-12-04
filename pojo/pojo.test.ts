namespace $ {
	
	$mol_test({
		
		'Serialize response'($) {
			const error = new Error('Response error', { cause : $mol_fetch_response.make({
				request: $mol_fetch_request.make({
					native: new Request('https://bla.local/some-url', {
						headers: {
							'Content-Type': 'application/json',
							'X-Request-ID': '1231',
						}
					})
				}),
				native: new Response(),
			}) })
			const json = $.$yuf_pojo(error)

			$mol_assert_equal(json, {
				message: 'Response error',
				request: {
					url: 'https://bla.local/some-url',
					headers: {
						'content-type': 'application/json',
						'x-request-id': '1231',
					}
				},

				response: {
					status: 200,
				}
			})
		},

		'Mask fields'($) {
			const error = new Error('Auth error', { cause: {
				auth_data: { password: '1234', login: 'admin' }
			} } )

			const json = $.$yuf_pojo(error, { hidden_props: /^(password)$/i })

			$mol_assert_equal(json, {
				message: 'Auth error',
				auth_data: {
					password: '*',
					login: 'admin'
				}
			})

		},

		'Serialize aggregate error'($) {
			const error = new AggregateError(
				[
					new Error('Simple error'),
					new Error('Complex error', { cause: {
						id: 1,
						sub_error: new Error('Error in cause'),
					} }),
				],

				'All error',

				{ cause: { overall_id: '321' } }
			)

			const json = $.$yuf_pojo(error, { hidden_props: /^(authorization)$/i })

			$mol_assert_equal(json, {
				message: 'All error',
				overall_id: '321',
				errors: [
					{
						message: 'Simple error'
					},
					{
						message: 'Complex error',
						id: 1,
						sub_error: {
							message: 'Error in cause'
						}
					}
				]
			})

		},

		'Serialize toJSON result'($) {
			class My extends $.$mol_object {
				native!: string
				url() { return '' }

				toJSON() {
					return {
						url: this.url(),
						native: this.native,
					}
				}
			}

			const my = My.make({
				native: 'native_str',
				url: $mol_const('url_val'),
			})

			const error = new Error('Custom error', { cause: {
				some: { my }
			} } )

			const json = $.$yuf_pojo(error)

			$mol_assert_equal(json, {
				message: 'Custom error',
				some: {
					my: {
						url: 'url_val',
						native: 'native_str'
					}
				}
			})

		},

		'Prevent circular call'($) {
			class My extends $.$mol_object {
				url() { return '' }
				next!: My

				toJSON() {
					return {
						url: this.url(),
						next: this.next,
					}
				}
			}
			const parent = My.make({ url: $mol_const('parent') })
			const child = My.make({ url: $mol_const('child'), next: parent })
			parent.next = child

			const json = $.$yuf_pojo({ child })

			$mol_assert_equal(json, {
				child: {
					url: 'child',
					next: {
						url: 'parent'
					}
				}
			})
		},

		'Do not serialize subpath if it throws error'($) {
			class My extends $.$mol_object {
				url() { return '' }
				toJSON() {
					return {
						url: this.url(),
					}
				}
			}

			const node = My.make({ url: $mol_const('some') })
			const node_error = My.make({ url: () => $mol_fail(new Error('Subpath error')) })
			const json = $.$yuf_pojo({ node, node_error })

			$mol_assert_equal(json, {
				node: {
					url: 'some',
				},
				node_error: 'Serialize_error(Subpath error)'
			})
		},

		'Include error stack'($) {
			const err = new Error('Some')
			const json = $.$yuf_pojo(err, { include_stack: true })

			$mol_assert_equal(typeof json.stack === 'string', true)
			$mol_assert_equal(json.stack.length > 1, true)

		}


	})

	
}
