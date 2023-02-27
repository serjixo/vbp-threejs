import Experience from "../Experience.js";
import * as THREE from 'three'
import LoadingOverlayVertex from '../world/shaders/loadingOverlay/LoadingOverlayVertex.glsl'
import LoadingOverlayFragment from '../world/shaders/loadingOverlay/LoadingOverlayFragment.glsl'
import gsap from "gsap";

export default class LoadingOverlay {

    constructor() {
        this.experience = new Experience()

        this.setMaterial()
        this.setGeometry()
        this.setMesh()
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            vertexShader: LoadingOverlayVertex,
            fragmentShader: LoadingOverlayFragment,
            transparent: true,
            uniforms: {
                uAlpha: {
                    value: 1
                }
            }
        })
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.experience.scene.add(this.mesh)
    }

    setTransparencyAnimated(transparency) {
        gsap.to(this.material.uniforms.uAlpha,
            {
                duration: 3,
                value: transparency,
            }
        )

    }

}