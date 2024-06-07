import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { CSG } from 'three-csg-ts';

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//Camera

// const fov = 75;
// const aspect = window.innerWidth / window.innerHeight; // the canvas default
// const near = 0.1;
// const far = 1000;
// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// camera.position.z = 3;

const aspectRatio = window.innerWidth / window.innerHeight;
const frustumSize = 5;
const camera = new THREE.OrthographicCamera(
    -frustumSize * aspectRatio / 2, // left
    frustumSize * aspectRatio / 2,  // right
    frustumSize / 2,                // top
    -frustumSize / 2,               // bottom
    0.1,                            // near
    1000                            // far
);

scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = renderer.domElement;
document.body.appendChild(canvas);

//Model
//Geometry
const boxWidth = 1;
const boxHeight = 3;
const boxDepth = 1;
const outerGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
const innerGeometry = new THREE.BoxGeometry(boxWidth - .1, boxHeight, boxDepth - .1);

const outerCube = new THREE.Mesh(outerGeometry);
const innerCube = new THREE.Mesh(innerGeometry);
// Make sure the .matrix of each mesh is current
outerCube.updateMatrix();
innerCube.updateMatrix();
// Create a bsp tree from each of the meshes
const bspA = CSG.fromMesh(outerCube);
const bspB = CSG.fromMesh(innerCube);
// Subtract one bsp from the other via .subtract... other supported modes are .union and .intersect
const bspResult = bspA.subtract(bspB);

//Mesh
// Get the resulting mesh from the result bsp
const cube = CSG.toMesh(bspResult, outerCube.matrix);

//Material
const material = new THREE.MeshBasicMaterial({ color: 0x636363, transparent: true, opacity: 0.9 });
cube.material = material

//Display Models
scene.add(cube);

//Edges Line
const edges = new THREE.EdgesGeometry(outerGeometry);
const edges2 = new THREE.EdgesGeometry(innerGeometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
const line2 = new THREE.LineSegments(edges2, new THREE.LineBasicMaterial({ color: 0xffffff }));
scene.add(line, line2);

// Create a grid material
const gridMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
// Create a grid geometry
const gridSize = 100; // size of the grid
const gridDivisions = 100; // number of divisions
const gridGeometry = new THREE.GridHelper(gridSize, gridDivisions, gridMaterial);
gridGeometry.position.set(0, -boxHeight / 2, 0); // position the grid at the origin or at the base of the object
// Add the grid to the scene
scene.add(gridGeometry);

//Controls
const minDistance = 2;
const maxDistance = 10;
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.rotateSpeed = 0.3;
controls.update();

function resizeRendererToDisplaySize(renderer) {

    const width = window.innerWidth;
    const height = window.innerHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {

        renderer.setSize(width, height, false);

    }

    const minDimension = Math.min(width, height);
    const maxDimension = Math.max(width, height);
    const fov = camera.fov * (Math.PI / 180); // Convert fov to radians
    const aspect = maxDimension / minDimension;
    const maxVerticalDistance = Math.tan(fov / 2) * maxDistance;
    const maxHorizontalDistance = maxVerticalDistance * aspect;
    controls.minDistance = minDistance;
    controls.maxDistance = maxDistance;
    controls.minZoom = minDistance / maxVerticalDistance;
    controls.maxZoom = maxDistance / maxVerticalDistance;

    return needResize;
}

function render() {

    if (resizeRendererToDisplaySize(renderer)) {

        renderer.setSize(window.innerWidth, window.innerHeight);

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(render);

// GLTF export function
function exportGLTF() {
    const exporter = new GLTFExporter();
    exporter.parse(scene, function (result) {
        const json = JSON.stringify(result);
        saveToFile(json, 'scene.gltf');
    });
}

// Function to save data to a file
function saveToFile(data, filename) {
    const blob = new Blob([data], { type: 'model/gltf+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// Attach click event handler to the export button
const exportBtn = document.getElementById('exportBtn');
exportBtn.addEventListener('click', exportGLTF);