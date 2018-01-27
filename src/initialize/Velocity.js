import Proton from '../core/Proton';
import Util from '../utils/Util';
import Polar2D from '../math/Polar2D';
import MathUtils from '../math/MathUtils';
import Initialize from './Initialize';

export default class Velocity extends Initialize {

    constructor(rpan, thapan, type) {
        super();

        this.rPan = Util.setSpanValue(rpan);
        this.thaPan = Util.setSpanValue(thapan);
        this.type = Util.initValue(type, 'vector');

        this.name = 'Velocity';
    }

    reset(rpan, thapan, type) {
        this.rPan = Util.setSpanValue(rpan);
        this.thaPan = Util.setSpanValue(thapan);
        this.type = Util.initValue(type, 'vector');
    };

    normalizeVelocity(vr) {
        return vr * Proton.MEASURE;
    }

    initialize(target) {
        if (this.type == 'p' || this.type == 'P' || this.type == 'polar') {
            const polar2d = new Polar2D(this.normalizeVelocity(this.rPan.getValue()), this.thaPan.getValue() * MathUtils.PI_180);

            target.v.x = polar2d.getX();
            target.v.y = polar2d.getY();
        } else {
            target.v.x = this.normalizeVelocity(this.rPan.getValue());
            target.v.y = this.normalizeVelocity(this.thaPan.getValue());
        }
    };
}