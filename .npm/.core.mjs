// @ts-check

import { spawn } from 'node:child_process'

export class YufNpmCore {
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
}
