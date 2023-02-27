export default class LoadingBar {
    constructor() {
        this.loadingBar = document.querySelector('.loading-bar')
    }

    setLength(length) {
        this.loadingBar.style.transform = `scaleX(${length})`
    }

    endOfLoad() {
        window.setTimeout(() => {
            this.loadingBar.classList.add('ended')
            this.loadingBar.style.transform = `scaleX(0)`
        }, 500)

    }
}
