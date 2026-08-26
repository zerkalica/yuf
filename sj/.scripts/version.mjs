// @ts-check
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const cwd = typeof Deno !== 'undefined' ? Deno.cwd.bind(Deno) : process.cwd.bind(process)

let version = ''

try {
  version = execSync('git describe --long --tags', { stdio: [ 'pipe', 'pipe', 'ignore' ] }).toString()
  version = version.replace(/\-0\-.*/, '').replace(/\-[\d]+\-/, '-')
} catch (e) {}

let hash = ''

if (! version) {
  try {
    hash = execSync('git rev-parse --short HEAD', { stdio: [ 'pipe', 'pipe', 'ignore' ] }).toString()
  } catch (e) {}

  let raw = ''

  try {
    raw = readFileSync(join(cwd(), 'version.ts')).toString()
  } catch (e) {}

  version = raw.match(/["']([\d\.]+(?:\-[\d\w]+)?)["']/)?.[1] ?? ''
}

if (! version ) version = '0.0.1'
if (hash) version = version.replace(/\-[\w\d]+$/, '') + `-${hash}`

console.log(version)
