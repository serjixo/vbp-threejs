import Experience from "../Experience.js";
import {pointsOfInterest} from "../utils/PointsOfInterest.js";
import World from "./World.js";

export default class PointsOfInterest {
    constructor() {
        this.points = pointsOfInterest

        this.experience = new Experience()
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes

        this.world = new World()
        this.raycaster = this.world.raycaster

    }

    updatePointsPositions() {
        for (const point of this.points) {

            const screenPosition = point.position.clone()
            screenPosition.project(this.camera.instance)

            this.raycaster.instance.setFromCamera(screenPosition, this.camera.instance)
            const intersects = this.raycaster.instance.intersectObjects(this.experience.scene.children, true)
            this.#hideOrShowPointBasedOnIntersections(intersects, point);

            const translateX = screenPosition.x * this.sizes.width * 0.5
            const translateY = screenPosition.y * this.sizes.height * 0.5
            point.element.style.transform = `translate(${translateX}px,${translateY}px)`

        }
    }

    #hideOrShowPointBasedOnIntersections(intersects, point) {
        if (this.world.sceneReady) {
            if (intersects.length === 0) {
                point.element.classList.add('visible')
            } else {
                const intersectionDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo(this.camera.instance.position)

                if (intersectionDistance < pointDistance) {
                    point.element.classList.remove('visible')
                } else {
                    point.element.classList.add('visible')
                }
            }
        }
    }
}