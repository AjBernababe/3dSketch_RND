import * as THREE from 'three'
import { meshBorderContainer } from '../utils/global';

export function onHover(scene, raycaster) {
    const meshes = scene.children.filter(child => child instanceof THREE.Group);
    const intersects = raycaster.intersectObjects(meshes, true);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    // for (let mesh of meshes) {
    //     meshBorderContainer.get(mesh).material = lineMaterial
    // }
    document.body.style.cursor = 'move';

    //If cursor hovers a mesh
    for (let i = 0; i < intersects.length; i++) {
        // meshBorderContainer.get(intersects[i].object).material.color.set(0xffff00)
        document.body.style.cursor = 'pointer';
    }
}