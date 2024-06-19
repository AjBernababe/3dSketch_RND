import * as THREE from 'three'
import { scene } from "../init/initialize";
import { connectionGroup, wireFrameContainer } from "./global";


export function addChild(mesh) {
    //Groups mesh and wireFrame
    const meshGroup = createMeshGroup(mesh)

    //Add group to ParentGroup
    connectionGroup.add(meshGroup)
}

export function addToScene() {
    scene.add(connectionGroup)

    //Center group
    const groupBox = new THREE.Box3().setFromObject(connectionGroup);
    const groupCenter = groupBox.getCenter(new THREE.Vector3());

    connectionGroup.position.sub(groupCenter);
}

export function getBoundingBox(container) {
    const boundingBox = new THREE.Box3().setFromObject(container);

    // Get dimensions of the bounding box
    const size = new THREE.Vector3();
    boundingBox.getSize(size);

    return {
        width: size.x,
        height: size.y,
        depth: size.z
    };
}

function createMeshGroup(mesh) {
    const newGroup = new THREE.Group()

    const wireFrame = createWireFrame(mesh);

    newGroup.add(mesh)
    newGroup.add(wireFrame)

    return newGroup;
}

function createWireFrame(mesh) {
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const wireFrame = new THREE.LineSegments(edges, material);

    //Add wireFrame to the global container
    wireFrameContainer.set(mesh, wireFrame)

    return wireFrame
}