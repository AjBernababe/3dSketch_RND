import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { CSG } from 'three-csg-ts';
let INTERSECTED
//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = renderer.domElement;
document.body.appendChild(canvas);
renderer.setAnimationLoop(render);

//Camera
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
camera.position.set(0, 0, 100);
scene.add(camera);

//Mesh
const boxWidth = 1;
const boxHeight = 3;
const boxDepth = 1;
// Create geometries
const outerGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
const innerGeometry = new THREE.BoxGeometry(boxWidth - .1, boxHeight, boxDepth - .1);
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
//Add mesh to scene
scene.add(cube);
//Edges Line
const meshToLineSegmentsMap = new Map();
createLineSegmentsForMesh(cube);
function createLineSegmentsForMesh(mesh) {
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const lineSegments = new THREE.LineSegments(edges);
    scene.add(lineSegments);

    // Store the association between mesh and LineSegments
    meshToLineSegmentsMap.set(mesh, lineSegments);
    return lineSegments;
}

//Controls
const controls = new OrbitControls(camera, canvas);
controls.rotateSpeed = 0.3;
controls.panSpeed = 0.5;
controls.update();

//Raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(1);
document.addEventListener('mousemove', onPointerMove);
function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function render() {

    if (resizeRendererToDisplaySize(renderer)) {

        renderer.setSize(window.innerWidth, window.innerHeight);

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

    }

    raycaster.setFromCamera(pointer, camera);
    const meshes = scene.children.filter(child => child instanceof THREE.Mesh);
    const intersects = raycaster.intersectObjects(meshes, false);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    for (let mesh of meshes) {
        meshToLineSegmentsMap.get(mesh).material = lineMaterial
    }
    document.body.style.cursor = 'move';

    for (let i = 0; i < intersects.length; i++) {
        meshToLineSegmentsMap.get(intersects[i].object).material.color.set(0xffff00)
        document.body.style.cursor = 'pointer';
    }

    renderer.render(scene, camera);
}

function resizeRendererToDisplaySize(renderer) {

    const width = window.innerWidth;
    const height = window.innerHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
        renderer.setSize(width, height, false);
    }

    const aspect = window.innerWidth / window.innerHeight;

    camera.left = -frustumSize * aspect / 2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = -frustumSize / 2;
    camera.updateProjectionMatrix();

    return needResize;
}

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