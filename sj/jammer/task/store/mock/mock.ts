namespace $ {
	export class $yuf_sj_jammer_task_store_mock extends $yuf_sj_jammer_task_store {
		tasks_count() { return 10 }

		override mock(next?: ReturnType<this['defaults']> | null) {
			if (next) return next
			const res = [] as string[]
			for (let i = 0 ; i < this.tasks_count(); i ++) {
				res.push('' + (i + 1))
			}
			return res  as ReturnType<this[ 'defaults' ]>
		}

		override draft_ids(next?: readonly string[]) {
			if (next === undefined) return super.draft_ids()
			const min = this.ids().length + 1
			return super.draft_ids(next.map((id, i) => id || String(min + i)))
		}
	}
}
