import * as THREE from 'three'
import { scene } from "../init/initialize";
import { meshBorderContainer } from "./global";


export function addToScene(mesh) {
    scene.add(mesh);

    //Add borders to mesh
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const lineSegments = new THREE.LineSegments(edges);
    scene.add(lineSegments);

    // Store the association between mesh and LineSegments
    meshBorderContainer.set(mesh, lineSegments);
}