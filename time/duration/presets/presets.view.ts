namespace $.$$ {
	export class $yuf_time_duration_presets extends $.$yuf_time_duration_presets {
		
		override presets() {
			return Object.values(this.durations()).map(dur => this.Preset(dur))
		}

		override preset_duration(str: string) {
			return new $mol_time_duration(str)
		}

		
	}
}
