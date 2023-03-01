import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";
import * as THREE from 'three'
import LoadingOverlay from "../utils/LoadingOverlay.js";
import PointsOfInterest from "./PointsOfInterest.js";
import Raycaster from "../utils/Raycaster.js";
import SceneReady from "../utils/SceneReady.js";

let worldInstance = null
export default class World {
    constructor() {
        if (worldInstance) {
            return worldInstance
        }
        worldInstance = this
        this.experience = new Experience()
        this.scene = this.experience.scene
        // this.test()
    }

    test() {
        const testMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial())
        // testMesh.castShadow = true
        testMesh.receiveShadow = true
        this.scene.add(testMesh)
    }

    onResourcesLoaded = () => {
        this.loadingOverlay = new LoadingOverlay()

        this.raycaster = new Raycaster()
        this.floor = new Floor()
        this.fox = new Fox()
        this.environment = new Environment()

        this.loadingOverlay.setTransparencyAnimated(0)

        this.sceneReady = new SceneReady()
        this.pointsOfInterest = new PointsOfInterest()


    }

    onUpdate = (time) => {
        if (this.fox)
            this.fox.onUpdate(time)
        if (this.pointsOfInterest)
            this.pointsOfInterest.updatePointsPositions()
    }
}