import * as GIZA from "../../../!misc/Scenario"
import { generateMesh } from '../meshTemplates/beam'

export class Beam {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.shape = GIZA.CommonComponents.PrimaryShape;
        this.type = GIZA.CommonComponents.PrimaryType;
        this.height = this.getHeight();
        this.width = this.getWidth();
        this.depth = this.getDepth();
        this.flangeThk = this.getFlangeThk();
        this.webThk = GIZA.PrimaryModel.twdet;

        this.mesh = generateMesh(this);
    }

    getHeight() {
        return 20;
    }

    getWidth() {
        let _width;

        switch (this.shape) {
            case 'HSS':
                _width = GIZA.PrimaryModel.B
                break;
        }

        return _width;
    }

    getDepth() {
        let _depth;

        switch (this.shape) {
            case 'HSS':
                _depth = GIZA.PrimaryModel.B
                break;
        }

        return _depth;
    }

    getFlangeThk() {
        let _thk;

        switch (this.shape) {
            case 'HSS':
                _thk = GIZA.PrimaryModel.tnom
                break;
        }

        return _thk;
    }
}