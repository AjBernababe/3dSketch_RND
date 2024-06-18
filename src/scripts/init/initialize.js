import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { hoverEvents } from '../events/hoverEvents';
import { onWindowResize } from '../events/windowResize';

//Three JS Set Up
export const scene = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
export const ambientLight = new THREE.AmbientLight(0xffffff, 1);
export const camera = new THREE.OrthographicCamera();
export const controls = new OrbitControls(camera, renderer.domElement);
//Cursor event listener
export const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();

export function initialize() {
    //Renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Controls
    controls.rotateSpeed = 0.5;
    controls.panSpeed = 0.5;
    controls.minZoom = .5
    controls.maxZoom = 3

    //Lights
    scene.add(ambientLight);

    //Raycaster
    pointer.x = 1
    pointer.y = 1
    document.addEventListener('mousemove', (event) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    });


    renderer.setAnimationLoop(render);
    //Animate - loops/refreshes canvas
    function render() {
        //Fixes camera and renderer size on window resizing
        onWindowResize(camera, renderer);

        //Handle object events using cursor
        raycaster.setFromCamera(pointer, camera);
        hoverEvents(scene, raycaster) //Event Method

        renderer.render(scene, camera);
    }
}