import { generateMesh } from '../meshTemplates/primary'

export let Primary = {
    x: 0,
    y: 0,
    height: 20,
    width: 6,
    depth: 6,
    type: 'HSS',
    mesh: generateMesh(this)
}