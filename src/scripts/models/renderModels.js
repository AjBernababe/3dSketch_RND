import { Primary } from './primary'
import { Beam } from './beam'
import { addToScene } from '../utils/helper'

export function renderModels() {
    //DrawPrimary
    const primary = new Primary()
    addToScene(primary.mesh)

    //DrawBeam
    const beam = new Beam()
    addToScene(beam.mesh)
}