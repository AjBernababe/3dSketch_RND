import * as THREE from 'three'
import { connectionGroup, wireFrameContainer } from '../utils/global';

export function onHover(raycaster) {
    const meshes = connectionGroup.children.flatMap(child => child.children.filter(obj => obj instanceof THREE.Mesh));

    const intersects = raycaster.intersectObjects(meshes);

    //Default
    document.body.style.cursor = 'move';
    wireFrameContainer.forEach(value => value.material.visible = false);

    //If cursor hovers an object
    for (let i = 0; i < intersects.length; i++) {
        document.body.style.cursor = 'pointer';
        wireFrameContainer.get(intersects[0].object).material.visible = true
    }
}