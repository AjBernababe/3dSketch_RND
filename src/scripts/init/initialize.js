import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { hoverEvents } from '../events/hoverEvents';


//Three JS Set Up
export const scene = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
export const camera = new THREE.OrthographicCamera();
export const controls = new OrbitControls(camera, renderer.domElement);

//Cursor event listener
export const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();

export function initialize() {
    //Scene
    scene.background = new THREE.Color(0x000000);

    //Renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setAnimationLoop(render);

    //Camera
    camera.position.set(0, 0, 100);
    scene.add(camera);

    //Controls
    controls.rotateSpeed = 0.3;
    controls.panSpeed = 0.3;
    controls.minZoom = .5
    controls.maxZoom = 3

    //Raycaster
    pointer.x = 1
    pointer.y = 1
    document.addEventListener('mousemove', (event) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    });

    //Animate
    function render() {
        handleWindowResizing() //Fixes camera and renderer size on window resizing

        renderer.render(scene, camera);

        //Rescale Camera/Renderer
        function handleWindowResizing() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            if (renderer.domElement.width !== width || renderer.domElement.height !== height)
                renderer.setSize(width, height);

            const frustumSize = 30;
            const aspect = window.innerWidth / window.innerHeight;

            camera.left = -frustumSize * aspect / 2;
            camera.right = frustumSize * aspect / 2;
            camera.top = frustumSize / 2;
            camera.bottom = -frustumSize / 2;
            camera.updateProjectionMatrix();
        }

        //Handle mesh events using cursor
        raycaster.setFromCamera(pointer, camera);
        hoverEvents() //Events
    }
}