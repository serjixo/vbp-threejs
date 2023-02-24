import Stats from 'stats.js'

export default class StatsWrapper {
    constructor() {

        this.stats = new Stats()
        document.body.appendChild(this.stats.dom)
        this.FPSPanel = this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    }

    setFPSMeter() {
        this.FPSPanel = this.stats.showPanel(0)
    }

    setMSMeter() {
        this.FPSPanel = this.stats.showPanel(1)
    }

    setMBMeter() {
        this.FPSPanel = this.stats.showPanel(2)
    }

    setCustomMeter() {
        this.FPSPanel = this.stats.showPanel(3)
    }

}
