import * as THREE from 'three'
import Sizes from "./utils/Sizes.js";
import ResizeObserver from "./utils/ResizeObserver.js";
import TimeObserver from "./utils/TimeObserver.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./world/World.js";
import Resources from "./utils/Resources.js";
import {sources} from "./utils/sources.js";
import ResourcesObserver from "./utils/ResourcesObserver.js";
import Debug from "./utils/debug.js";
import StatsWrapper from './utils/StatsWrapper.js'

let instance = null

export default class Experience {

    constructor(canvas) {

        //singleton
        if (instance) {
            return instance
        }
        instance = this

        //enable global acces to experience from browser console
        window.experience = this

        //options
        this.canvas = canvas

        //Setup
        this.debug = new Debug()
        this.statsWrapper = new StatsWrapper()
        this.sizes = new Sizes()
        this.scene = new THREE.Scene()
        this.camera = new Camera();
        this.renderer = new Renderer()
        this.world = new World()


        //Event Observers
        //resize
        this.resizeObserver = new ResizeObserver();
        this.resizeObserver.subscribe(this.sizes.onResize)
        this.resizeObserver.subscribe(this.camera.onResize)
        this.resizeObserver.subscribe(this.renderer.onResize)

        //time update
        const timeObserver = new TimeObserver()
        timeObserver.subscribe(this.update)


        //const resources loaded
        const resourcesObserver = new ResourcesObserver()
        resourcesObserver.subscribe(this.world.onResourcesLoaded)

        //Loading sources
        this.resources = new Resources(sources)

    }

    update = (time) => {
        this.statsWrapper.stats.begin()
        this.camera.update()
        this.renderer.onUpdate()
        this.world.onUpdate(time)
        this.statsWrapper.stats.end()
    }

    destroy() {
        this.resizeObserver.stopResizeListener()
        // this.resizeObserver.stopResizeListener()
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()
            }
            for (const key in child.material) {
                const value = child.material[key]
                if (value && typeof value.dispose === 'function') {
                    value.dispose()
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if (this.debug.active) {
            this.debug.ui.destroy()
        }
    }
}
