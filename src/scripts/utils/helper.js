import * as THREE from 'three'
import { scene } from "../init/initialize";
import { meshBorderContainer, connectionGroup } from "./global";
import { camera, controls } from '../init/initialize';


export function addToScene(mesh) {

    //Add borders to mesh
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const lineSegments = new THREE.LineSegments(edges);
    scene.add(lineSegments);

    //Store the association between mesh and LineSegments
    meshBorderContainer.set(mesh, lineSegments);

    //Group meshes
    connectionGroup.add(mesh)

    scene.add(connectionGroup);

    function calculateGroupDimensions(connectionGroup) {
        const boundingBox = new THREE.Box3().setFromObject(connectionGroup);

        // Get dimensions of the bounding box
        const size = new THREE.Vector3();
        boundingBox.getSize(size);

        return {
            width: size.x,
            height: size.y,
            depth: size.z
        };
    }

    THREE.Group.prototype.size = calculateGroupDimensions(connectionGroup);

    camera.position.set(connectionGroup.size.width / 2, connectionGroup.size.height / 2, connectionGroup.size.height);
    controls.target.set(connectionGroup.size.width / 2, connectionGroup.size.height / 2, connectionGroup.size.depth / 2);

    const arrowLength = 1;
    const arrowDirection = new THREE.Vector3();
    camera.getWorldDirection(arrowDirection);
    const arrowHelper = new THREE.ArrowHelper(arrowDirection, camera.position, arrowLength, 0xff0000);
    scene.add(arrowHelper);
}

export function groupObject(group, mesh) {

}