import { Primary } from './primary'
import { Beam } from './beam'
import { addToScene, addChild } from '../utils/helper'

export function renderModels() {
    //DrawPrimary
    const primary = new Primary()
    addChild(primary.mesh)

    //DrawBeam
    const beam = new Beam()
    addChild(beam.mesh)

    //Add models to scene
    addToScene()
}