// @ts-check
import { YufNpmBuilder } from '../../../.npm/.builder.mjs'
import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'

const builder = new YufNpmBuilder(import.meta.url)

builder.globalName = () => '$yuf_npm_keycloak'

await builder.build()
await Promise.all(
    ['keycloak.d.ts'].map(file =>
        copyFile(
			join(builder.absWorkingDir(), 'node_modules', 'keycloak-js', 'lib', file),
			join(builder.outDirAbsolute(), file)
		)
    )
)
