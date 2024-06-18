import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

export function generateMesh(model) {
    let mesh
    let h = model.height
    let w = model.width
    let d = model.depth
    let x = model.x + 10
    let y = model.y

    const material = new THREE.MeshBasicMaterial({ color: 0x636363, transparent: true, opacity: 0.9 });

    switch (model.shape) {
        case 'HSS':
            const path = new THREE.Shape();
            path.moveTo(x, y)
            path.lineTo(x + w, y)
            path.lineTo(x + w, y + h)
            path.lineTo(x, y + h)
            path.lineTo(x, y)

            const extrudeSettings = {
                steps: 1,
                depth: d,
                bevelEnabled: false,
            };

            const geometry = new THREE.ExtrudeGeometry(path, extrudeSettings);
            mesh = new THREE.Mesh(geometry, material);
            break;
    }

    return mesh


































    // // Create geometries
    // const outerGeometry = new THREE.BoxGeometry(model.width, model.height, model.depth);
    // const innerGeometry = new THREE.BoxGeometry(model.width - model.flangeThk, model.height, model.depth - model.flangeThk);

    // // Create meshes for bsp
    // const outerCube = new THREE.Mesh(outerGeometry);
    // const innerCube = new THREE.Mesh(innerGeometry);

    // // Create a bsp tree from each of the meshes
    // const bspA = CSG.fromMesh(outerCube);
    // const bspB = CSG.fromMesh(innerCube);

    // // Subtract one bsp from the other via .subtract... other supported modes are .union and .intersect
    // const bspResult = bspA.subtract(bspB);

    // // Get the resulting mesh from the result bsp
    // const cube = CSG.toMesh(bspResult, outerCube.matrix);

    // //Material
    // const material = new THREE.MeshBasicMaterial({ color: 0x636363, transparent: true, opacity: 0.9 });
    // cube.material = material
    // return cube;
}