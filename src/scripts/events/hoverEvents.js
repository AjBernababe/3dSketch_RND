import * as THREE from 'three'
import { scene, raycaster } from "../init/initialize";
import { meshBorderContainer } from '../utils/global';

export function hoverEvents() {
    const meshes = scene.children.filter(child => child instanceof THREE.Mesh);
    const intersects = raycaster.intersectObjects(meshes, false);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    for (let mesh of meshes) {
        meshBorderContainer.get(mesh).material = lineMaterial
    }
    document.body.style.cursor = 'move';

    //If cursor hovers a mesh
    for (let i = 0; i < intersects.length; i++) {
        meshBorderContainer.get(intersects[i].object).material.color.set(0xffff00)
        document.body.style.cursor = 'pointer';
    }
}