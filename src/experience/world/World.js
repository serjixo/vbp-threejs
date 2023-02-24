import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";
import * as THREE from 'three'
import LoadingOverlay from "../utils/LoadingOverlay.js";
import LoadingOverlayTest from "../utils/LoadingOverlayTest.js";

export default class World {
    constructor() {

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
        for (let i = 0; i < 100; i++) {
            this.loadingOverlayTest = new LoadingOverlayTest()
        }

        this.floor = new Floor()
        this.fox = new Fox()
        this.environment = new Environment()
    }

    onUpdate = (time) => {
        if(this.fox)
            this.fox.onUpdate(time)
    }
}