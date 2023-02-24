import Observer from "./Observer.js";

export default class ResizeObserver extends Observer {

    constructor() {
        super()
        // this.subscribedMethods = []
        window.addEventListener('resize', this.notify)
    }

    // subscribe(func) {
    //     this.subscribedMethods.push(func);
    // }
    //
    // unsubscribe(func) {
    //     this.subscribedMethods = this.subscribedMethods.filter(observer => observer !== func);
    // }

    // notify = () => {
    //     if (this.subscribedMethods.length) {
    //         this.subscribedMethods.forEach(observer => observer());
    //     }
    // }

    stopResizeListener() {
        window.removeEventListener('resize', this.notify)
    }

}

