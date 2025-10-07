// @ts-check

import url from 'node:url'
import { basename, join } from 'node:path'
import { stat, writeFile, readFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'

/**
 * @param {unknown} value
 * @returns {value is import('esbuild').Plugin}
 */
function guard_defined(value) {
    return value !== null && value !== undefined
}

/**
 * @example mam/my/some.npm/build.mjs
 * ```mjs
	// @ts-check
	import { YufNpmBuilder } from './builder.mjs'

	const builder = new YufNpmBuilder(import.meta.url)

	builder.globalName = () => '$yuf_npm'

	await builder.build()
```

 * @example mam/package.json
 ```json
{
...
  "scripts": {
    "build": "node --enable-source-maps --trace-uncaught ./.build.mjs",
    "watch": "node --enable-source-maps --trace-uncaught ./.build.mjs --watch"
  },
...
```
*/
export class YufNpmBuilder {
    /**
     * @param {string} metaUrl
     * @param {readonly string[]} args
     */
    constructor(metaUrl, args = YufNpmBuilder.args) {
        this.metaUrl = metaUrl
        this.args = args
    }

    /** @type {string[]} */
    // @ts-ignore
    static args = typeof Deno !== 'undefined' ? Deno.args : process.argv.slice(2)
    /** @type {() => string} */
    // @ts-ignore
    static cwd = typeof Deno !== 'undefined' ? Deno.cwd.bind(Deno) : process.cwd.bind(process)
    // @ts-ignore
    static isWin = typeof Deno !== 'undefined' ? Deno.build.os === 'windows' : process.platform === 'win32'

    /**
     * @param {string[]} argsRaw
     * @param {Partial<Parameters<typeof spawn>[2] & { stderr: string }>} optsRaw
     */
    static spawn(argsRaw, optsRaw) {
        /**
         * @type {Parameters<typeof spawn>[2] & { stderr: string }}
         */
        const opts = {
            stdio: 'inherit',
            stderr: 'inherit',
            shell: this.isWin,
            ...optsRaw,
        }
        const prog = argsRaw[0]
        const args = argsRaw.slice(1)

        console.log(opts.cwd, `"${argsRaw.join(' ')}"`)

        /**
         * @type Promise<number>
         */
        const result = new Promise((resolve, rejectRaw) => {
            const p = spawn(prog, args, opts)

            /**
             * @param {Error} error
             */
            const reject = error => {
                rejectRaw(
                    new Error(
                        `"${prog} ${args.join(' ')}" returns ${error} ${p.stderr ? `: ${p.stderr}` : ''}`,
                        // @ts-ignore
                        { cause: { error, p } }
                    )
                )
            }

            p.on('error', reject)
            p.on('close', code => ((code ?? 0) > 0 ? reject(new Error('Exit code 1')) : resolve(code || 0)))
            return p
        })

        return result
    }

    /**
     * @param {readonly string[]} args
     */
    static commands(args) {
        const files = args.filter(arg => !arg.startsWith('--'))
        const watch = args.some(arg => arg.includes('--watch'))
        return { files, watch }
    }

    /**
     * @param {{watch?: boolean, args?: readonly string[], cwd?: string} | undefined} rec
     */
    static async run(rec) {
        const cwd = rec?.cwd || this.cwd()
        const { files, watch } = this.commands(rec?.args?.length ? rec?.args : this.args)

        const allArgs = [join('gd', 'snap'), ...files]
        if (files.some(arg => arg.includes('gd/demo'))) allArgs.push('gd/avatar')

        const npmDirs = (
            await Promise.all(
                allArgs.map(arg =>
                    stat(join(cwd, arg + '.npm'))
                        .then(stat => (stat.isDirectory() ? arg + '.npm' : null))
                        .catch(() => null)
                )
            )
        ).filter(dir => dir !== null && dir !== undefined)

        for (const path of npmDirs) {
            const dir = join(cwd, path)
            await this.spawn(['npm', 'install'], { cwd: dir })
            if (!watch) await this.spawn(['npm', 'run', 'build'], { cwd: dir })
        }

        if (!watch) {
            await this.spawn(['npm', 'start', ...files], { cwd })
            await this.polyfill({ args: files, cwd })
            return
        }

        return Promise.all([
            ...npmDirs.map(npmDir => (npmDir ? this.spawn(['npm', 'run', 'watch'], { cwd: join(cwd, npmDir) }) : null)),
            this.spawn(['npm', 'start'], { cwd }),
        ])
    }

	static get selfPath() {
        return url.fileURLToPath(new URL('.', import.meta.url))
	}

	static async coreJsPath() {
		let selfPath = this.selfPath
		let coreJsPath = ''

		while (selfPath) {
			coreJsPath = join(selfPath, 'node_modules', 'core-js', 'stable', 'index.js')
			try {
				const rec = await stat(coreJsPath)
				if (rec.isFile()) return coreJsPath
			} catch (e) {
			}
			selfPath = basename(selfPath)
		}
		return null
	}

    /**
     * @param {{cwd: string, args: readonly string[]}} param0
     */
    static async polyfill({ cwd, args }) {
		const coreJsPath = await this.coreJsPath()
        for (const prj_dir_relative of args) {
            console.log('cwd', cwd)

            const absWorkingDir = join(cwd, prj_dir_relative)
            const file = 'web'
			
            const builder = new YufNpmBuilder(`file://${absWorkingDir}/${file}.js`, this.args)
            builder.keepNames = () => true
            builder.entryPoints = () => [
                {
                    in: `${builder.outDirAbsolute()}/${file}.js`,
                    out: `${file}.prod`,
                },
                ... coreJsPath ? [{
                    in: coreJsPath,
                    out: `${file}.polyfill`,
                }] : [],
            ]

            await builder.build()

            const index_file = join(builder.outDirAbsolute(), 'index.html')

            let prev

            try {
                prev = (await readFile(index_file)).toString()
            } catch (e) {
				// @ts-ignore
                if (e.code !== 'ENOENT') throw e
            }

            if (prev) {
                const next = coreJsPath
					? prev.replace(/(<script src="web)(\.js"[^>]*><\/script>)/, '$1.polyfill$2\n$1.prod$2')
					: prev
                await writeFile(join(builder.outDirAbsolute(), 'index.prod.html'), next)
            }
        }
    }

    static async imports() {
        return {
            context: (await import('esbuild')).context,
            resolve: (await import('esbuild-plugin-resolve')).default,
        }
    }

	/**
	 * @returns {typeof YufNpmBuilder}
	 */
	factory() {
		// @ts-ignore
		return this.constructor
	}

    imports() {
		return this.factory().imports()
    }

    absWorkingDir() {
        return url.fileURLToPath(new URL('.', this.metaUrl))
    }

    get commands() {
        return this.factory().commands(this.args)
    }

    isWatch() {
        return this.commands.watch
    }

    files() {
        return this.commands.files
    }

    /**
     * @returns {Record<string, string>}
     */
    resolveDefaults() {
        return {
            fs: 'empty/object',
            path: 'empty/object',
            vertx: 'empty/object',
        }
    }

    /**
     * @returns {Record<string, string>}
     */
    resolve() {
        return {}
    }

    /**
     * @returns {Promise<Array<import('esbuild').Plugin | null>>}
     */
    async pluginsExtra() {
        const { resolve } = await this.imports()
        return [
            resolve({ ...this.resolveDefaults(), ...this.resolve() }),
        ]
    }

    /**
     * @returns {import('esbuild').BuildOptions['entryPoints']}
     */
    entryPoints() {
        return {
            app: '.app.ts',
        }
    }

    globalName() {
        return ''
    }

    outdir() {
        return '-'
    }

    outDirAbsolute() {
        return join(this.absWorkingDir(), this.outdir())
    }

    minify() {
        return true
    }

    keepNames() {
        return false
    }

    /**
     * @returns {Promise<import('esbuild').BuildOptions>}
     */
    async config() {
        const plugins = [...(await this.pluginsExtra())].filter(guard_defined)

        return {
            entryPoints: this.entryPoints(),
            plugins,
            globalName: this.globalName() || undefined,
            // assetNames: '[name]-[hash]',
            outdir: this.outdir(),
            target: ['es2018'],
            format: 'iife',
            write: true,
            sourcemap: 'linked',
            // в esbuild keepNames: true + minify: false не работает,
            // @see https://github.com/evanw/esbuild/issues/2149
            minify: this.keepNames() ? true : this.minify(),
            keepNames: this.keepNames(),
            bundle: true,
            allowOverwrite: true,
            absWorkingDir: this.absWorkingDir(),
        }
    }

    /**
     * @type {import('esbuild').BuildContext | undefined}
     */
    _context = undefined

    /**
     * @returns {Promise<import('esbuild').BuildContext>}
     */
    async context() {
        if (this._context) return this._context
        const { context } = await this.imports()
        const config = await this.config()
        this._context = await context(config)

        return this._context
    }

    async rebuild() {
        const context = await this.context()
        const data = await context.rebuild()
        if (data.errors.length) console.error(data.errors[0])
        if (data.warnings.length) console.warn(data.warnings[0])
        if (data.outputFiles?.length) {
            console.log('output files:')
            console.log(data.outputFiles.map(file => file.path).join('\n'))
        }
    }

    async done() {
        const context = await this.context()

        if (!this.isWatch()) {
            console.log('exit', this.absWorkingDir())
            context.dispose()
        } else {
            console.log('watch', this.absWorkingDir())
            context.watch()
        }
    }

	async install() {
		const factory = this.factory()
		for (const cwd of [factory.selfPath, this.absWorkingDir() ] ) {
			await factory.spawn(['npm', 'install'], { cwd })
		}
	}

    async build() {
		await this.install()
        await this.rebuild()
        await this.done()
    }
}
