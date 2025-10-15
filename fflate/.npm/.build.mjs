// @ts-check
import { YufNpmBuilder } from '../../.npm/.builder.mjs'

const builder = new YufNpmBuilder(import.meta.url)

builder.globalName = () => '$yuf_fflate_npm'

await builder.build()
