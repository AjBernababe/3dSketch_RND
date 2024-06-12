import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

export function generateMesh(model) {
    //Mesh
    const boxWidth = 6;
    const boxHeight = 20;
    const boxDepth = 6;

    // Create geometries
    const outerGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const innerGeometry = new THREE.BoxGeometry(boxWidth - 1, boxHeight, boxDepth - 1);

    // Create meshes for bsp
    const outerCube = new THREE.Mesh(outerGeometry);
    const innerCube = new THREE.Mesh(innerGeometry);

    // Create a bsp tree from each of the meshes
    const bspA = CSG.fromMesh(outerCube);
    const bspB = CSG.fromMesh(innerCube);

    // Subtract one bsp from the other via .subtract... other supported modes are .union and .intersect
    const bspResult = bspA.subtract(bspB);

    // Get the resulting mesh from the result bsp
    const cube = CSG.toMesh(bspResult, outerCube.matrix);

    //Material
    const material = new THREE.MeshBasicMaterial({ color: 0x636363, transparent: true, opacity: 0.9 });
    cube.material = material

    return cube;
}