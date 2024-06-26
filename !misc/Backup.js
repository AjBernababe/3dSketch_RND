import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

//Test import
import { CommonComponents } from '../../misc/Scenario';
console.log(CommonComponents)
import Car from '../../misc/TestClass';
const myCar = new Car('Toyota', 'Camry', 2020, 'blue');
myCar.displayDetails();

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const fov = 75;
const aspect = 2; // the canvas default
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;
const minDistance = 2;
const maxDistance = 10;

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.rotateSpeed = 0.2;
controls.update();

const scene = new THREE.Scene();

{

    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(- 1, 2, 4);
    scene.add(light);

}

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

function makeInstance(geometry, color, x) {

    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;

}

const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, - 2),
    makeInstance(geometry, 0xaa8844, 2),
];

{

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
        'https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg',
        () => {

            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;
            scene.background = texture;

        });

}

function resizeRendererToDisplaySize(renderer) {

    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
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
    if (needResize) {

        renderer.setSize(width, height, false);

    }

    return needResize;

}

function render(time) {

    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

    }

    cubes.forEach((cube, ndx) => {

        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;

    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);

}

requestAnimationFrame(render);

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