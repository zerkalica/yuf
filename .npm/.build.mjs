// @ts-check
import { YufNpmBuilder } from './.builder.mjs'

const builder = new YufNpmBuilder(import.meta.url)

builder.globalName = () => '$yuf_npm'

await builder.build()
