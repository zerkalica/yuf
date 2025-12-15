// example

import url from 'node:url'
import { basename, join } from 'node:path'
import { stat, writeFile, readFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'

