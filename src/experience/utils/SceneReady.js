let instance = null
export default class SceneReady {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        //todo improve the way it chescks is ready the scene better than a timeout
        this.isReady = false
        window.setTimeout(() => {
            this.isReady = true
        }, 2000)
    }
}