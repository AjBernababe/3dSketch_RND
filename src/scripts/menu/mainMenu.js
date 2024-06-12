import { displayCrosshair } from './crosshair'
import { exportGLTF } from './export'

export function mainMenu() {
    //Draw Crosshair
    displayCrosshair()

    // Attach click event handler to the export button
    document.getElementById('exportBtn').addEventListener('click', exportGLTF);
}