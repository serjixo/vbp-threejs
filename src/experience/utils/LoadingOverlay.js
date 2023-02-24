import Experience from "../Experience.js";
import * as THREE from 'three'
import MeshBasicMaterial from "../utils/MeshBasicMaterial.js";

export default class LoadingOverlay extends MeshBasicMaterial {
    constructor() {
        super()
        this.experience = new Experience()

        this.setMaterial()
        this.setGeometry()
        this.setMesh()
    }

    setMaterial() {
        this.material = new THREE.MeshBasicMaterial()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry()
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(3,3,0)
        this.experience.scene.add(this.mesh)
    }
}