import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { scene } from '../init/initialize'

// GLTF export function
export function exportGLTF() {
    const exporter = new GLTFExporter();
    exporter.parse(scene, function (result) {
        const json = JSON.stringify(result);
        saveToFile(json, 'connection.gltf');
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