import { connectionGroup } from "../utils/global";
import { getBoundingBox } from "../utils/helper";

export function onWindowResize(camera, renderer) {
    const canvas = renderer.domElement;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const connection = getBoundingBox(connectionGroup)
    const needResize = canvas.width !== width || canvas.height !== height
    const isPortrait = connection.width < connection.height
    const allowance = 10

    if (needResize)
        renderer.setSize(width, height);

    const frustumSize = Math.max(connection.width, connection.height) + allowance;
    const aspect = isPortrait
        ? width / height
        : height / width;

    //Front View
    if (isPortrait) {
        camera.left = -frustumSize * aspect / 2;
        camera.right = frustumSize * aspect / 2;
        camera.top = frustumSize / 2;
        camera.bottom = -frustumSize / 2;
    }
    else {
        camera.left = -frustumSize / 2;
        camera.right = frustumSize / 2;
        camera.top = frustumSize * aspect / 2;
        camera.bottom = -frustumSize * aspect / 2;
    }

    camera.updateProjectionMatrix();
}